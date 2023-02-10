import { checker } from "./function.js";
import { countChar } from "./function.js";
import { validationUI } from "./function.js";
import { checkPass } from "./function.js";
import { isMajor } from "./function.js";
import { sanitizeInput } from "./function.js";




console.log("script loaded");
const form = document.querySelector("form");
const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const regexTel = /^(\+33\s?|0)\s?[1-9]\s?(\d{2}\s?){3}\d{2}$/;
const info = document.createElement("p");



// Ecouteurs d'évènements

form.firstName.addEventListener("keyup", () => {
    countChar(form.firstName);
})

form.lastName.addEventListener("keyup", () => {
    countChar(form.lastName);
})

form.email.addEventListener("keyup", () => {
    validationUI(form.email, regexEmail);
})

form.pass1.addEventListener("keyup", () => {
    checkPass(form.pass1, form.pass2);
})

form.pass2.addEventListener("keyup", () => {
    checkPass(form.pass1, form.pass2);
})


form.contact.addEventListener("keyup", () => {
    validationUI(form.email, regexTel);
})

form.majeur.addEventListener("change", () => {
    isMajor(form.majeur);

})

form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("Form submitted");
    let isValid = false;
    let verif = [];
    for (let i = 0; i < form.elements.length; i++) {
        let field = form.elements[i];
        if (field.id === "firstName" || field.id === "lastName") {
            field.value = sanitizeInput(field.value);
            isValid = countChar(field);
            verif.push(isValid);
        }

        if (field.id === "email") {
            isValid = validationUI(field, regexEmail);
            verif.push(isValid);
        }

        if (field.id === "pass1" || field.id === "pass2") {
            isValid = checkPass(form.pass1, form.pass2);
            verif.push(isValid);
        }


        if (field.id === "contact") {
            isValid = validationUI(field, regexTel);
            verif.push(isValid);
        }

        if (field.id === "majeur") {
            isValid = isMajor(field);
            verif.push(isValid);
        }


    } console.log('verif =>', verif);

    if (checker(verif)) {
        console.log("data sent to the server");
        setTimeout(() => form.submit(), 1000);
    } else {
        console.warn("FORM IS INVALID")
    }
});


// // Compter de nombre de caractères
// function countChar(input) {
//     if (input.value.length > 2 && input.value.length <= 20) {
//         input.classList.remove("danger");
//         input.classList.add("success");
//         input.parentElement.classList.add("success-checked");
//         console.info(`✅ ${input.id}: Nb de charactère OK`)
//         return true;
//     } else {
//         input.classList.remove("success");
//         input.parentElement.classList.remove("success-checked");
//         input.classList.add("danger");
//         console.warn(`${input.id}: Nb de charactère incorrect`)
//         return false;
//     }
// }

// // Vérifier la présence d'un mail valide et d'un numéro de téléphone valide
// function validationUI(input, regex) {
//     if (regex.test(input.value)) {
//         input.classList.remove("danger");
//         input.classList.add("success");
//         input.parentElement.classList.add("success-checked");
//         console.info(`✅ ${input.id} input is valid`);
//         return true;
//     } else {
//         input.classList.remove("success");
//         input.parentElement.classList.remove("success-checked");
//         input.classList.add("danger");
//         console.warn(`${input.id} is invalid`);
//         return false;
//     }
// }

// // Tester si les mots de passes sont identique
// function checkPass(pass1, pass2) {
//     if (pass1.value === pass2.value && pass1.value.length > 4) {
//         pass1.classList.remove("danger");
//         pass1.classList.add("success");
//         pass2.classList.remove("danger");
//         pass2.classList.add("success");
//         console.info("✅ Les mots de passes sont identiques");
//         return true
//     } else {
//         pass1.classList.remove("success");
//         pass1.classList.add("danger");
//         pass2.classList.remove("success");
//         pass2.classList.add("danger");
//         console.warn("Les mots de passes ne correspondent pas");
//         return false
//     }
// }

// // Tester si l'utilisateur est majeur
// function isMajor(input) {
//     if (input.checked) {
//         input.parentElement.classList.remove("danger")
//         input.parentElement.classList.add("success")
//         console.info("✅ Utilisateur majeur");
//         return true;
//     } else {
//         input.parentElement.classList.remove("success")
//         input.parentElement.classList.add("danger")
//         console.warn("Utilisateur mineur");
//         return false;
//     }
// }

// // Empêcher l'injection de code ou de caractères spéciaux
// function sanitizeInput(input) {
//     // Enlever les balises HTML
//     input = input.replace(/<[^>]*>/g, "");
//     // Enlever les caractères spéciaux dangereux
//     input = input.replace(/[^a-zA-Z0-9 ]/g, "");
//     // Enlever les espaces multiples
//     input = input.replace(/\s\s+/g, " ");
//     // Enlever les espaces en début et fin de chaîne
//     input = input.trim();
//     return input;
// }