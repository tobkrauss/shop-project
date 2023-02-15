// https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
document.addEventListener("DOMContentLoaded", () => {
  console.log("project-watch JS imported successfully!");
});


  // Define the total variable and set its initial value to 0 let total = 0; //
  Iterate through each product and add its price to the total
  {{#each products}}
    total +=
    {{this.price}};
  {{/each}}

  // Update the total price on the page
  document.getElementById("total-price").textContent = 'hellooo';

