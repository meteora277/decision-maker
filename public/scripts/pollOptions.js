
$(document).ready(() => {
  const insertOption = function (optionsCount) {
    $("#options-container").append(
      $(`
            <div class="option-container">
              <input type="text" name="title${optionsCount}" class="form-control" placeholder="Title">
              <input type="text" name="description${optionsCount}" class="form-control" placeholder="description">
              <button class="btn btn-primary remove-option">Remove Option</button
            </div>
          `)
    );
  };

  let optionsCount = 0;

  //render 2 instances of options on page load, assuming you need to pick between 2 options in a decision maker app
  for (let i = 0; i < 2; i++) {
    insertOption(optionsCount);
    optionsCount += 1;
  }
  $("#email-button").on("click", function (event) {
    event.preventDefault();

    //grabs email input field and appends a
    $(this).parents().children(".alert").remove();

    let emailInput = $(this).parent().children("input");
    const validEmail =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        emailInput.val()
      );

    if (!emailInput.val()) {
      $(this)
        .parent()
        .children("input")
        .after(
          '<div class="alert alert-danger">Email address is required</div>'
        );
    } else if (!validEmail) {
      $(this)
        .parent()
        .children("input")
        .after(
          '<div class="alert alert-danger">Not a Valid Email Address</div>'
        );
    } else if (validEmail) {
      $(this).parent().hide();
    }
  });

  $("#new-option").on("click", (event) => {
    event.preventDefault();
    insertOption(optionsCount);
    optionsCount += 1;
  });

  $("#options-container").on(
    "click",
    ".option-container button",
    function (event) {
      event.preventDefault();
      // if valid email address the email form will be hidden
      //we can also add a class here to hdie it with css
      $(this).parent().remove();
    }
  );
});
