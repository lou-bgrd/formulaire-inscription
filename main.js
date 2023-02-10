const form = document.querySelector("form");
const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const regexTel = /^(\+33\s?|0)\s?[1-9]\s?(\d{2}\s?){3}\d{2}$/;
const info = document.createElement("p");

function countChr(input) {
    if (input.value.length > 4 && input.value.length <= 20) {
        input.classList.remove("danger");
        input.classList.add("success");
        input.parentElement.classList.add("success-checked");
        return true;
    } else {
        input.classList.remove("success");
        input.parentElement.classList.remove("success-checked");
        input.classList.add("danger");
        return false;
    }
}
// Vérifier le présence d'un mail et numéro de tel valide
function validationUI(input, regex) {
    if (regex.test(input.value)) {
        input.classList.remove("danger");
        input.classList.add("success");
        console.info("✅ input is valid");
        return true;
    } else {
        input.classList.remove("success");
        input.classList.add("danger");
        console.warn("input is invalid");
        return false;
    }
}

function checkPass(pass1, pass2) {
    if (pass1.value === pass2.value && pass1.length < 6) {
        pass1.classList.add("success");
        pass1.classList.remove("danger");
        pass2.classList.add("success");
        pass2.classList.remove("danger");
        console.warn("Les mots de passes sont identiques")
        return true;
    } else {
        pass1.classList.add("danger");
        pass1.classList.remove("success");
        pass2.classList.add("danger");
        pass2.classList.remove("success");
        console.warn("Les mots de passes ne correspondent pas")
        return false;
    }
}
// tester si l'utilisateur est majeur
function isMajor(input) {
    if (input.checked === true) {
        input.parentElement.classList.remove("danger");
        input.parentElement.classList.add("success");
        console.info(`Utilisateur majeur`);
        return true;

    } else {
        input.parentElement.classList.add("danger");
        input.parentElement.classList.remove("success");
        console.info(`Utilisateur mineur`);
        return false;

    }
}



function sanitizeInput(input) {
    // Enlever les balises HTML
    input = input.replace(/<[^>]*>/g, "");
    // Enlever les caractères spéciaux dangereux
    input = input.replace(/[^a-zA-Z0-9 ]/g, "");
    // Enlever les espaces multiples
    input = input.replace(/\s\s+/g, " ");
    console.log("input 4 => ", input);
    // Enlever les espaces en début et fin de chaîne
    input = input.trim();
    console.log("input 5 => ", input);
    return input;
}
