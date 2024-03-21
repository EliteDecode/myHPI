export const generateHtmlContent1 = (user, form, complaints) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Medical History Report</title>
      <style>
        body {
          font-family: 'Segoe UI', sans-serif;
          background: #ffffff;
          padding: 20px;
          color: #333;
        }

        section {
          margin-bottom: 30px;
        }

        h1, h2 {
          color: #333;
          border-bottom: 1px solid #575656;
          padding-bottom: 10px;
          text-transform: uppercase;
        }

        h1 span {
          color: #478AFB;
        }

        ul {
          list-style-type: none;
          padding: 0;
          display: flex;
          flex-wrap: wrap;
        }

        li {
          margin-bottom: 10px;
          border: 1px solid #333;
          width: 100%;
          padding: 10px;
          font-size: 18px;
          border-radius: 8px;
          background: #fff;
        }

        .header {
          text-align: center;
          padding: 20px;
        }
      </style>
    </head>
    <body>
      <div class='header'>
        <h1>My History of Present Illness <span>(MyHPI)</span></h1>
      </div>

      <!-- User Profile Details Section -->
      <section>
        <h2>User Profile Details</h2>
        <ul>
          <li><strong>First Name:</strong> ${user?.Firstname}</li>
          <li><strong>Middle Name:</strong> ${user?.Middlename}</li>
          <li><strong>Last Name:</strong> ${user?.Lastname}</li>
          <li><strong>Email:</strong> ${user?.Email}</li>
          <li><strong>Sex:</strong> ${user?.Sex}</li>
          <li><strong>Phone:</strong> ${user?.Phone}</li>
          <!-- Add other user details here -->
        </ul>
      </section>

      <div>
  <h2>Complaints</h2>
  <ul style='display: flex; flex-wrap: wrap'>
  <li><strong>Body Part:</strong> ${complaints?.bodyPart}</li>
  <li><strong>Duration:</strong> ${complaints?.duration}</li>
  <li><strong>Quality:</strong> ${complaints?.quality}</li>
  <li><strong>Severity:</strong> ${complaints?.severity}</li>
  <li><strong>Timing:</strong> ${complaints?.timing}</li>
  <li><strong>Modifying Factors:</strong> ${complaints?.modifyingFactors}</li>
  <li><strong>Associated Symptoms:</strong> ${
    complaints?.associatedSymptoms
  }</li>
  <li><strong>Context:</strong> ${complaints?.context}</li>
  </ul>
 </div>

      <!-- Active Medical Problems Section -->
      <section>
        <h2>Active Medical Problems</h2>
        <ul>
          <li>${form?.activeMedicalProblems
            .map((item) => item.value)
            .join("</li><li>")}</li>
        </ul>
      </section>

      <!-- Allergies Section -->
      <section>
        <h2>Allergies</h2>
        <ul>
          <li>${form?.allergies
            .map((item) => item.value)
            .join("</li><li>")}</li>
        </ul>
      </section>

      <!-- Family History Section -->
      <section>
        <h2>Family History</h2>
        <ul>
          <li>${form?.familyHistory
            .map((item) => item.value)
            .join("</li><li>")}</li>
        </ul>
      </section>

      <!-- Immunizations Section -->
      <section>
        <h2>Immunizations</h2>
        <ul>
          <li><strong>COVID:</strong> ${
            form?.immunizations.covid.selectedOption
          }</li>
          <!-- Add other immunizations details here -->
        </ul>
      </section>

      <!-- Medications Section -->
      <section>
        <h2>Medications</h2>
        <ul>
          <li>${form?.medications
            .map((item) => item.value)
            .join("</li><li>")}</li>
        </ul>
      </section>

      <!-- Obstetric History Section -->
      ${
        user?.Sex === "Male"
          ? ""
          : `<section>
        <h2>Obstetric History</h2>
        <ul>
          <li><strong>Age at First Period:</strong> ${form?.obstericHistory?.ageAtFirstPeriod}</li>
          <!-- Add other obstetric history details here -->
        </ul>
      </section>`
      }

      <section>
    <h2>Past Medical History</h2>
    <ul style='display: flex; flex-wrap: wrap'>
      <li>${form?.pastMedicalHistory
        .map((item) => item.value)
        .join("</li><li>")}</li>
    </ul>
  </section>

  <section>
    <h2>Sexually Transmitted Disease History</h2>
    <ul style='display: flex; flex-wrap: wrap'>
      <li>${form?.sexualTransmittedDiseaseHistory
        .map((item) => item.value)
        .join("</li><li>")}</li>
    </ul>
  </section>

  <section>
    <h2>Social History</h2>
    <ul style='display: flex; flex-wrap: wrap'>
      <li><strong>Marital Status:</strong> ${
        form?.socialHistory.maritalStatus
      }</li>
      <li><strong>Profession:</strong> ${form?.socialHistory.profession}</li>
      <li><strong>Quantity:</strong> ${form?.socialHistory.quantity}</li>
      <li><strong>Recreational Drug Use:</strong> ${
        form?.socialHistory.recreationalDrugUse
      }</li>
      <li><strong>Sexual Partners:</strong> ${
        form?.socialHistory.sexualPartners
      }</li>
      <li><strong>Tobacco Use:</strong> ${form?.socialHistory.tobaccoUse}</li>
    </ul>
  </section>

  <section>
    <h2>Surgical History</h2>
    <ul style='display: flex; flex-wrap: wrap'>
      <li>${form?.surgicalHistory
        .map((item) => item.value)
        .join("</li><li>")}</li>
    </ul>
  </section>

  <section>
    <h2>Travel History</h2>
    <ul style='display: flex; flex-wrap: wrap'>
      <li>${form?.travelHistory
        .map((item) => item.value)
        .join("</li><li>")}</li>
    </ul>
  </section>

  <!-- New Section: Complaints -->
<div>
  <h2>Complaints</h2>
  <ul style='display: flex; flex-wrap: wrap'>
  <li><strong>Body Part:</strong> ${complaints?.bodyPart}</li>
  <li><strong>Duration:</strong> ${complaints?.duration}</li>
  <li><strong>Quality:</strong> ${complaints?.quality}</li>
  <li><strong>Severity:</strong> ${complaints?.severity}</li>
  <li><strong>Timing:</strong> ${complaints?.timing}</li>
  <li><strong>Modifying Factors:</strong> ${complaints?.modifyingFactors}</li>
  <li><strong>Associated Symptoms:</strong> ${
    complaints?.associatedSymptoms
  }</li>
  <li><strong>Context:</strong> ${complaints?.context}</li>
  </ul>
 </div>
  

    </body>
    </html>
  `;
};

export const generatePlainHtmlContent = (user, form, complaints) => {
  return [
    `
    <div class='header'>
      <h1>My History of Present Illness <span>(MyHPI)</span></h1>
    </div>

    <div>
      <h2>User Profile Details</h2>
      <ul>
        <li><strong>First Name:</strong> ${user?.Firstname}</li>
        <li><strong>Middle Name:</strong> ${user?.Middlename}</li>
        <li><strong>Last Name:</strong> ${user?.Lastname}</li>
        <li><strong>Email:</strong> ${user?.Email}</li>
        <li><strong>Sex:</strong> ${user?.Sex}</li>
        <li><strong>Phone:</strong> ${user?.Phone}</li>
        <!-- Add other user details here -->
      </ul>
    </div>

    

   <div>
   <h2>Complaints</h2>
   <ul style='display: flex; flex-wrap: wrap'>
   <li><strong>Body Part:</strong> ${complaints?.bodyPart}</li>
   <li><strong>Duration:</strong> ${complaints?.duration}</li>
   <li><strong>Quality:</strong> ${complaints?.quality}</li>
   <li><strong>Severity:</strong> ${complaints?.severity}</li>
   <li><strong>Timing:</strong> ${complaints?.timing}</li>
   <li><strong>Modifying Factors:</strong> ${complaints?.modifyingFactors}</li>
   <li><strong>Associated Symptoms:</strong> ${
     complaints?.associatedSymptoms
   }</li>
   <li><strong>Context:</strong> ${complaints?.context}</li>
   </ul>
  </div>
   

    <div>
      <h2>Active Medical Problems</h2>
      <ul>
        <li>${form?.activeMedicalProblems
          .map((item) => item.value)
          .join("</li><li>")}</li>
      </ul>
    </div>

    <div>
      <h2>Allergies</h2>
      <ul>
        <li>${form?.allergies.map((item) => item.value).join("</li><li>")}</li>
      </ul>
    </div>

    <div>
      <h2>Family History</h2>
      <ul>
        <li>${form?.familyHistory
          .map((item) => item.value)
          .join("</li><li>")}</li>
      </ul>
    </div>
    <div>
      <h2>Immunizations</h2>
      <ul>
        <li><strong>COVID:</strong> ${
          form?.immunizations.covid.selectedOption
        }</li>
        <!-- Add other immunizations details here -->
      </ul>
    </div>
    <div>
      <h2>Medications</h2>
      <ul>
        <li>${form?.medications
          .map((item) => item.value)
          .join("</li><li>")}</li>
      </ul>
    </div>
    ${
      user?.Sex === "Male"
        ? ""
        : `<div>
      <h2>Obstetric History</h2>
      <ul>
        <li><strong>Age at First Period:</strong> ${form?.obstericHistory?.ageAtFirstPeriod}</li>
        <!-- Add other obstetric history details here -->
      </ul>
    </div>`
    }

    <div>
  <h2>Past Medical History</h2>
  <ul style='display: flex; flex-wrap: wrap'>
    <li>${form?.pastMedicalHistory
      .map((item) => item.value)
      .join("</li><li>")}</li>
  </ul>
</div>

<div>
  <h2>Sexually Transmitted Disease History</h2>
  <ul style='display: flex; flex-wrap: wrap'>
    <li>${form?.sexualTransmittedDiseaseHistory
      .map((item) => item.value)
      .join("</li><li>")}</li>
  </ul>
</div>

<div>
  <h2>Social History</h2>
  <ul style='display: flex; flex-wrap: wrap'>
    <li><strong>Marital Status:</strong> ${
      form?.socialHistory.maritalStatus
    }</li>
    <li><strong>Profession:</strong> ${form?.socialHistory.profession}</li>
    <li><strong>Quantity:</strong> ${form?.socialHistory.quantity}</li>
    <li><strong>Recreational Drug Use:</strong> ${
      form?.socialHistory.recreationalDrugUse
    }</li>
    <li><strong>Sexual Partners:</strong> ${
      form?.socialHistory.sexualPartners
    }</li>
    <li><strong>Tobacco Use:</strong> ${form?.socialHistory.tobaccoUse}</li>
  </ul>
</div>

<div>
  <h2>Surgical History</h2>
  <ul style='display: flex; flex-wrap: wrap'>
    <li>${form?.surgicalHistory
      .map((item) => item.value)
      .join("</li><li>")}</li>
  </ul>
</div>

<div>
  <h2>Travel History</h2>
  <ul style='display: flex; flex-wrap: wrap'>
    <li>${form?.travelHistory.map((item) => item.value).join("</li><li>")}</li>
  </ul>
</div>

 

`,
  ];
};
