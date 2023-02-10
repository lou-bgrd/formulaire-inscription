# How to validate form using Regular Expression in JavaScript?

https://www.geeksforgeeks.org/how-to-validate-form-using-regular-expression-in-javascript/

Il n'y a pas de réponse absolue à cette question car la sécurité dépend de la mise en œuvre spécifique de chaque solution.

Cependant, généralement, il est plus sécurisé de traiter les données côté serveur plutôt que côté client, car cela permet de limiter les risques liés à la manipulation des données par un utilisateur malveillant. En utilisant un pattern regex sur un champ input en HTML, vous pouvez vous assurer que les données entrées par l'utilisateur correspondent à un format spécifique, mais elles peuvent toujours être manipulées avant d'être envoyées au serveur. En utilisant Javascript pour traiter les données, vous pouvez également vous assurer que les données correspondent à un format spécifique, mais elles peuvent également être manipulées avant d'être envoyées au serveur.

Il est important de noter qu'il est important de valider les données côté serveur pour s'assurer qu'elles sont valides même si elles ont été manipulées côté client.

La validation des données côté serveur consiste à vérifier que les données envoyées par le client (généralement via un formulaire HTML) sont valides avant de les utiliser ou de les stocker. Cela permet de s'assurer que les données respectent les critères de validation définis, tels que les types de données attendus, les longueurs de champs, les formats de données, etc.

En validant les données côté serveur, vous pouvez vous protéger contre les attaques telles que l'injection SQL, la validation des entrées ou encore la validation de format de données qui peuvent être réalisées via une modification des données envoyées par le client. Cela permet également de fournir des feedbacks à l'utilisateur sur les erreurs de saisie.

Il existe plusieurs outils et bibliothèques pour la validation des données côté serveur en fonction du langage de programmation utilisé.

## Version 1

```js=
console.log("script loaded");
const form = document.querySelector("form");
const email = form.email;
const contact = form.contact;
email.addEventListener("keyup", validateEmail);
function validateEmail(e) {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (regex.test(email.value)) {
        console.log("SUCCESS ✔️");
        email.classList.remove("danger");
        email.classList.add("success");
        return true;
    } else {
        email.classList.remove("success");
        email.classList.add("danger");
        return false;
    }
}
contact.addEventListener("keyup", validateTel);
function validateTel(e) {
    const regex = /^(\+33\s?|0)\s?[1-9]\s?(\d{2}\s?){3}\d{2}$/;
    if (regex.test(contact.value)) {
        console.log("SUCCESS ✔️");
        contact.classList.remove("danger");
        contact.classList.add("success");
        return true;
    } else {
        console.log("ERROR ✖️");
        contact.classList.remove("success");
        contact.classList.add("danger");
        return false;
    }
}
```

## Version 2

```js=
console.log("script loaded");
const form = document.querySelector("form");
console.log("form => ", form.elements);
let firstName = form.firstName;
const email = form.email;
const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const contact = form.contact;
const regexTel = /^(\+33\s?|0)\s?[1-9]\s?(\d{2}\s?){3}\d{2}$/;

form.addEventListener("submit", (e) => {
    console.log(" e => ", e);
    e.preventDefault();
    let isTrue = false;
    console.log("========>form submitted ========>");

    console.log("e => ", e);
    e.target.firstName.value = sanitizeInput(firstName.value);

    if (regexEmail.test(email.value)) {
        email.classList.remove("danger");
        email.classList.add("success");
        console.info("✅ email is valid");
        isTrue = true;
    } else {
        email.classList.remove("success");
        email.classList.add("danger");
        console.warn("email is invalid");
        isTrue = false;
    }
    if (regexTel.test(contact.value)) {
        contact.classList.remove("danger");
        contact.classList.add("success");
        console.log("✅ contact is valid");
        isTrue = true;
    } else {
        contact.classList.remove("success");
        contact.classList.add("danger");
        console.warn("contact is invalid");
        isTrue = false;
    }
    if (isTrue) {
        console.log("✅ data sent to server");
        e.target.submit();
    } else {
        console.warn("form is invalid");
    }
});

function sanitizeInput(input) {
    console.log("input 1 => ", input);
    // Enlever les balises HTML
    input = input.replace(/<[^>]*>/g, "");
    console.log("input 2 => ", input);
    // Enlever les caractères spéciaux dangereux
    input = input.replace(/[^a-zA-Z0-9 ]/g, "");
    console.log("input 3 => ", input);
    // Enlever les espaces multiples
    input = input.replace(/\s\s+/g, " ");
    console.log("input 4 => ", input);
    // Enlever les espaces en début et fin de chaîne
    input = input.trim();
    console.log("input 5 => ", input);
    return input;
}
```

## Version 3

```js=
console.log("script loaded");
const form = document.querySelector("form");
console.log("form => ", form.elements);
let firstName = form.firstName;
const email = form.email;
const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const contact = form.contact;
const regexTel = /^(\+33\s?|0)\s?[1-9]\s?(\d{2}\s?){3}\d{2}$/;

email.addEventListener("keyup", () => validationUI(email, regexEmail));
contact.addEventListener("keyup", () => validationUI(contact, regexTel));

form.addEventListener("submit", (e) => {
    e.preventDefault();
    form.firstName.value = sanitizeInput(form.firstName.value);
    let emailIsValid = validationUI(email, regexEmail);
    let contactIsValid = validationUI(contact, regexTel);

    if (emailIsValid && contactIsValid) {
        console.log("✅ data sent to server");
        e.target.submit();
    } else {
        console.warn("form is invalid");
    }
});

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
```

##  Version 4 - Plus moderne

```js=
console.log('script loaded');
const form = document.querySelector('form');

form.addEventListener('submit', e => {
    e.preventDefault();

    const fields = [...form.elements].filter(field => field.id);
    const errors = fields.map(field => {
        if (field.id === "firstName" || field.id === "lastName") {
            return field.value.length > 4 && field.value.length <= 20 ? true : `${field.id} length is invalid`;
        }
        if (field.id === "email") {
            return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(field.value) ? true : `${field.id} is invalid`;
        }
        if (field.id === "pass1" || field.id === "pass2") {
            return form.pass1.value === form.pass2.value ? true : 'passwords do not match'
        }
        if (field.id === "contact") {
            return /^(\+33\s?|0)\s?[1-9]\s?(\d{2}\s?){3}\d{2}$/.test(field.value) ? true : `${field.id} is invalid`;
        }
        if (field.id === "majeur") {
            return field.checked ? true : 'user is not major'
        }
    });

    if (errors.every(error => error === true)) {
        setTimeout(() => {
            console.log('✅ data sent to server');
            form.reset();
        }, 2000);
    } else {
        console.warn('FORM IS INVALID:', errors);
    }
});
```

## Voir la méthode bind

https://www.youtube.com/watch?v=XviRIb9BMpI&t=8s 

<iframe width="560" height="315" src="https://www.youtube.com/embed/XviRIb9BMpI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>



