function generateInputs() {

  const count = document.getElementById("semesterCount").value;
  const sgpaInputs = document.getElementById("sgpaInputs");

  sgpaInputs.innerHTML = "";

  for (let i = 1; i <= count; i++) {
    sgpaInputs.innerHTML += `
      <input 
        type="number" 
        step="0.01"
        min="0"
        max="10"
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

  for (let input of sgpas) {

    let value = parseFloat(input.value);

    if (isNaN(value)) continue;

    if (value < 0 || value > 10) {
      alert("Please enter SGPA between 0 and 10");
      return;
    }

    total += value;
    count++;
  }

  let cgpa = 0;

  if (count > 0) {
    cgpa = total / count;
  }

  document.getElementById("result").innerText =
    `CGPA: ${cgpa.toFixed(2)}`;
}
function calculateRequiredSGPA() {

  const target = parseFloat(document.getElementById("targetCGPA").value);

  if (isNaN(target) || target < 0 || target > 10) {
    alert("Enter valid target CGPA between 0 and 10");
    return;
  }

  const sgpas = document.querySelectorAll(".sgpa");

  let total = 0;
  let completed = 0;

  for (let input of sgpas) {

    let value = parseFloat(input.value);

    if (isNaN(value)) continue;

    if (value < 0 || value > 10) {
      alert("Please enter SGPA between 0 and 10");
      return;
    }

    total += value;
    completed++;
  }

  const totalSem = 8;
  const remaining = totalSem - completed;

  if (remaining <= 0) {
    document.getElementById("requiredResult").innerText =
      "All semesters already completed!";
    return;
  }

  const requiredSGPA = ((target * totalSem) - total) / remaining;

  if (requiredSGPA > 10) {
    document.getElementById("requiredResult").innerText =
      `Not possible. You need ${requiredSGPA.toFixed(2)} SGPA (above 10).`;
    return;
  }

  if (requiredSGPA < 0) {
    document.getElementById("requiredResult").innerText =
      `Target already achieved! 🎉`;
    return;
  }

  document.getElementById("requiredResult").innerText =
    `You need average SGPA of ${requiredSGPA.toFixed(2)} in remaining semesters.`;
}
