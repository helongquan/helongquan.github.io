// 联系表单交互效果开始
document.getElementById("contact-form").addEventListener("submit", function (e) {
  e.preventDefault();

  var btn = document.getElementById("contact-submit");
  var status = document.getElementById("contact-status");
  var formData = new FormData(this);

  btn.disabled = true;
  btn.textContent = "Sending...";
  status.textContent = "";

  fetch("https://script.google.com/macros/s/AKfycbzOWSJNRvu8XhC32QEm9BYfWnnZQbUmbHa6yGG-Z4-m0ixXtDuPwx61yfKKAIGDsiLF/exec", {
    method: "POST",
    mode: "no-cors",
    body: formData
  })
    .then(function () {
      status.style.color = "green";
      status.textContent = "Message sent. Thanks for reaching out!";
      document.getElementById("contact-form").reset();
    })
    .catch(function () {
      status.style.color = "red";
      status.textContent = "Failed to send. Please try again later, or email directly to h13927440553@gmail.com";
    })
    .finally(function () {
      btn.disabled = false;
      btn.textContent = "Send";
    });
});
// 联系表单交互效果结束