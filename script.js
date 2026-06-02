function generateInputs() {

    const count = parseInt(
        document.getElementById("semesterCount").value
    );

    const container =
        document.getElementById("semesterInputs");

    container.innerHTML = "";

    if (isNaN(count) || count < 1 || count > 20) {

        container.innerHTML =
            "<p>Please enter semesters between 1 and 20.</p>";

        return;
    }

    for (let i = 1; i <= count; i++) {

        container.innerHTML += `

        <div class="semester-card">

            <h4>Semester ${i}</h4>

            <input
                type="number"
                step="0.01"
                min="0"
                max="10"
                placeholder="SGPA"
                class="sgpa"
            >

            <input
                type="number"
                min="1"
                placeholder="Credits"
                class="credits"
            >

        </div>

        `;
    }

    // Disable mouse-wheel changing values
    document.querySelectorAll('input[type="number"]').forEach(input => {
        input.addEventListener('wheel', function(e) {
            e.target.blur();
        });
    });
}

function calculateCGPA() {

    const sgpas =
        document.querySelectorAll(".sgpa");

    const credits =
        document.querySelectorAll(".credits");

    let weightedTotal = 0;
    let totalCredits = 0;

    for (let i = 0; i < sgpas.length; i++) {

        const sgpa =
            parseFloat(sgpas[i].value);

        const credit =
            parseFloat(credits[i].value);

        if (
            isNaN(sgpa) ||
            isNaN(credit)
        ) {
            continue;
        }

        if (sgpa < 0 || sgpa > 10) {

            alert(
                "SGPA must be between 0 and 10"
            );

            return;
        }

        if (credit <= 0) {

            alert(
                "Credits must be greater than 0"
            );

            return;
        }

        weightedTotal += sgpa * credit;

        totalCredits += credit;
    }

    let cgpa = 0;

    if (totalCredits > 0) {

        cgpa =
            weightedTotal /
            totalCredits;
    }

    document.getElementById("result")
        .innerText =
        `CGPA: ${cgpa.toFixed(2)}`;
}

function calculateRequiredCGPA() {

    const target =
        parseFloat(
            document.getElementById("targetCGPA").value
        );

    if (
        isNaN(target) ||
        target < 0 ||
        target > 10
    ) {

        document.getElementById(
            "requiredResult"
        ).innerText =
            "Enter a valid target CGPA (0-10)";

        return;
    }

    const sgpas =
        document.querySelectorAll(".sgpa");

    const credits =
        document.querySelectorAll(".credits");

    let weightedTotal = 0;
    let completedCredits = 0;

    let remainingSemesters = 0;

    for (let i = 0; i < sgpas.length; i++) {

        const sgpa =
            parseFloat(sgpas[i].value);

        const credit =
            parseFloat(credits[i].value);

        if (
            !isNaN(sgpa) &&
            !isNaN(credit)
        ) {

            weightedTotal +=
                sgpa * credit;

            completedCredits +=
                credit;
        }
        else {

            remainingSemesters++;
        }
    }

    if (completedCredits === 0) {

        document.getElementById(
            "requiredResult"
        ).innerText =
            "Enter at least one completed semester.";

        return;
    }

    if (remainingSemesters === 0) {

        document.getElementById(
            "requiredResult"
        ).innerText =
            "No remaining semesters left.";

        return;
    }

    const avgCreditPerSemester =
        completedCredits /
        (sgpas.length - remainingSemesters);

    const remainingCredits =
        avgCreditPerSemester *
        remainingSemesters;

    const requiredSGPA =
        (
            target *
            (completedCredits + remainingCredits)
            -
            weightedTotal
        )
        /
        remainingCredits;

    if (requiredSGPA > 10) {

        document.getElementById(
            "requiredResult"
        ).innerText =
            "❌ Target CGPA is not achievable with the remaining semesters.";

        return;
    }

    if (requiredSGPA < 0) {

        document.getElementById(
            "requiredResult"
        ).innerText =
            "🎉 Target already achieved.";

        return;
    }

    document.getElementById(
        "requiredResult"
    ).innerText =
        `You need an average SGPA of ${requiredSGPA.toFixed(2)} in the remaining semesters.`;
}
