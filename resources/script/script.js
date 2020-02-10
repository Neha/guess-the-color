const guessTheColor = (function($) {
  const mainWrapper = $.querySelector(".container");
  const wrapperDiv = $.querySelector(".wrapper");
  const icon = $.getElementById("icon");
  const correctAnswerElement = $.getElementById("correctAnswer");
  const nextLinkElement = $.getElementById("nextLink")
  const userInputField = $.getElementById("userInput");

  let color = "#";
  let NextLinkTemplate = `<a href='' data-type='next-link' id="nextLink">Next Color</a>`;
  let matched = false;
  let correctAnswer = "";

  const createRandomColor = function() {
    if (color.length > 6) {
      color = "#";
      let letters = "0123456789ABCDEF";
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    } else {
      let letters = "0123456789ABCDEF";
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }
  };
  const setColorToBody = function() {
    mainWrapper.style.backgroundColor = createRandomColor();
  };
  const compareTheColors = function() {
    let userInputColor = userInputField.value;

    // Remove hte next color link
    if (nextLinkElement) {
       nextLinkElement.remove();
    }
    else if (correctAnswerElement) {
      dcorrectAnswerElement.remove();
    }
    
    // Check the color and user input is matching or not?
    if (`#${userInputColor.toLowerCase()}` === color.toLowerCase()) {
      matched = true;

      // Add correct icon and should remove after few minutes
      if (icon.hasAttribute("class")) {
        icon.removeAttribute("class");
        icon.setAttribute("class", "correct-icon");
      } else {
        icon.setAttribute("class", "correct-icon");
      }
      setTimeout(() => {
          icon.removeAttribute("class");
          setColorToBody();
      
        // Clear input only when it is correct value and check for the correct message DIV
        userInputField.value = "";
      }, 2000);
    } else {
      matched = false;
      // Add correct icon and should remove after few minutes
      if (icon.hasAttribute("class")) {
        icon.removeAttribute("class");
        icon.setAttribute("class", "wrong-icon");
      } else {
        icon.setAttribute("class", "wrong-icon");
      }

      setTimeout(() => {
        ShowCorrectAnswer();
        appendNextLink();
      }, 2000);
    }
  };

  const ShowCorrectAnswer = function() {
    // Remove the correct answer if the user is able to guess right.
    if (correctAnswerElement && matched) {
      correctAnswerElement.remove();
      userInputField.value = "";
    }
    // If the answer is wrong && correct answer is available. Update the answer
    else if (correctAnswerElement && !matched) {
      correctAnswerElement.innerHTML = " ";
      correctAnswerElement.innerHTML = color;

      userInputField.value = "";
      userInputField.value = color;
    }
    // If the answer is wrong && correct answer is not available. Append it in the DOM
    else if (!correctAnswerElement && !matched) {
      correctAnswer = `<div id="correctAnswer" class="correctAnswer">${color}</div>`;
      wrapperDiv.innerHTML += correctAnswer;
      let colorToShow = color;
      colorToShow = colorToShow.slice(1, 7);
      userInputField.setAttribute("value", colorToShow);
    }
  };

  const appendNextLink = function() {
    if (nextLinkElement) {
      nextLinkElement.remove();
      wrapperDiv.innerHTML += NextLinkTemplate;
    } else {
      wrapperDiv.innerHTML += NextLinkTemplate;
    }
  };

  const events = function(element) {
    element.addEventListener("click", function(e) {
      e.preventDefault();
      if (e.target.localName === "button") {
        compareTheColors();
      }
      if (e.target.getAttribute("data-type") === "next-link") {
        setColorToBody();
        if (correctAnswerElement) {
          correctAnswerElement.remove();
          userInputField.setAttribute("value", "");
        }
        if (icon.hasAttribute("class")) {
          icon.removeAttribute("class");
        }
      }
    });
  };
  return {
    init: function() {
      events(mainWrapper);
      setColorToBody();
    }
  };
})(document);
guessTheColor.init();
