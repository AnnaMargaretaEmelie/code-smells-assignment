/*
  1. Se om du kan hitta två stycken code smells i följande funktion och rätta till dem.
  Funktionen tar emot en lista med längshoppslängder och syftet med funktionen är att summera
  dessa hopplängder.
  */

  function getLength(jumpings: number[]): number {
    return jumpings.reduce(
      (jumpDistanceSoFar, currentJump) => jumpDistanceSoFar + currentJump, 0
    );
  }
  
  /*
    2. I detta exempel har vi fokuserat på if-statements. Se om du kan göra exemplet bättre!
    */
  
  class Student {
    constructor(
      public name: string,
      public handedInOnTime: boolean,
      public passed: boolean
    ) {}
  }
  
  function getStudentStatus(student: Student): string {
    student.passed = student.name == "Sebastian" && student.handedInOnTime;
          
    if (student.passed) {
      return "VG";
    } else {
      return "IG";
    }
  }
  
// Men om någon mer än Sebastian ska kunna bli godkänd: 

// function getStudentStatus(student: Student): string {
//   if (student.handedInOnTime) {
//     return "VG";
//   }
//   return "IG";
// }



  /*
    3. Variabelnamn är viktiga. Kika igenom följande kod och gör om och rätt.
    Det finns flera code smells att identifiera här. Vissa är lurigare än andra.
    */
  
  class Temp {
    constructor(
      public city: string,
      public date: Date,
      public temperature: number
    ) {}
  }

  function averageWeeklyTemperature(temps: Temp[]): number {
    let sum = 0;
    let count = 0;
    const oneWeekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000; 

    for(const temp of temps) {
      if (temp.city === "Stockholm" && temp.date.getTime() > oneWeekAgo) {
        sum += temp.temperature;
        count++;
      }
    }

    return count > 0 ? sum / count : 0;
  }
  
  /*
    4. Följande funktion kommer att presentera ett objekt i dom:en. 
    Se om du kan göra det bättre. Inte bara presentationen räknas, även strukturer.
    */
  
  function showProduct(
    name: string,
    price: number,
    image: string,
    parent: HTMLElement
  ) {
    const container = document.createElement("div");

    container.innerHTML = `
    <h4>${name}</h4>
    <img src="${image}" alt="${name}">
    <strong>${price.toString()}</strong>
    `;
    parent.appendChild(container);
  }
  
  /*
    5. Följande funktion kommer presentera studenter. Men det finns ett antal saker som 
    går att göra betydligt bättre. Gör om så många som du kan hitta!
    */
  function presentStudents(students: Student[]) {
    for (const student of students) {
        const container = document.createElement("div");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = student.handedInOnTime;
  
        container.appendChild(checkbox);

        const listSelector = student.handedInOnTime ? "ul#passedstudents" : "ul#failedstudents";
        const listOfStudents = document.querySelector(listSelector);

        listOfStudents?.appendChild(container);
    }
  }
  
  /*
    6. Skriv en funktion som skall slå ihop följande texter på ett bra sätt:
    Lorem, ipsum, dolor, sit, amet
    Exemplet under löser problemet, men inte speciellt bra. Hur kan man göra istället?
    */
  function concatenateStrings() {
    const words = ["Lorem", "ipsum", "dolor", "sit", "amet"];
    
    return words.join(", ");
  }
  
  /* 
  7. Denna funktion skall kontrollera att en användare är över 20 år och göra någonting.
      Det finns dock problem med denna typ av funktion. Vad händer när kraven ändras och
      fler och fler parametrar behöver läggas till? T.ex. avatar eller adress. Hitta en bättre
      lösning som är hållbar och skalar bättre. 
  */
  interface User {
    name: string;
    birthday: Date;
    email: string;
    password: string;
    avatar?: string;
    address?: string;
  }

  interface CreateUserResult {
    success: boolean;
    message: string;
  }

  function isUserOldEnough(birthday: Date, minAge: number = 20): boolean {
    const today = new Date();
    const age = today.getFullYear() - birthday.getFullYear() - (today <new Date(today.getFullYear(), birthday.getMonth(), birthday.getDate()) ? 1: 0);

    return age >= minAge;
  }

  function createUser(user: User): CreateUserResult {
  
    if (! isUserOldEnough(user.birthday)) {
      return {success: false, message: "Du är under 20 år"};
    }

    // Logik för att skapa en användare

    return {success: true, message: "Användare skapad"};
  }
  