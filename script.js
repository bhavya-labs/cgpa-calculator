function generateInputs() {

  const count = document.getElementById("semesterCount").value;

  const sgpaInputs = document.getElementById("sgpaInputs");

  sgpaInputs.innerHTML = "";

  for (let i = 1; i <= count; i++) {

    sgpaInputs.innerHTML += `
    
      <input 
        type="number" 
        step="0.01"
        placeholder="Enter Semester ${i} SGPA"
        class="sgpa"
      >
    `;
  }
}

function calculateCGPA() {

  const sgpas = document.querySelectorAll(".sgpa");

  let total = 0;

  let count = 0;

  sgpas.forEach((input) => {

    let value = parseFloat(input.value);
     if (value < 0 || value > 10) {
  alert("Please enter SGPA between 0 and 10");
  return;
}
    if (!isNaN(value)) {
      total += value;
      count++;
    }
  });
 
  let cgpa = 0;

  if (count > 0) {
    cgpa = total / count;
  }

  document.getElementById("result").innerText =
    `CGPA: ${cgpa.toFixed(2)}`;
}