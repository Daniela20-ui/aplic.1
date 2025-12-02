document.getElementById("formTest").addEventListener("submit", function(e){
    e.preventDefault();

    let nombre = document.getElementById("nombre").value.trim();
    let correo = document.getElementById("correo").value.trim();
    let edad = document.getElementById("edad").value.trim();
    let pass = document.getElementById("password").value.trim();
    let res = document.getElementById("resultado");

    // Casos Negativos + Validaciones
    if(nombre === ""){
        return mostrar("❌ ERROR: El nombre no puede estar vacío", "red");
    }
    if(correo === ""){
        return mostrar("❌ ERROR: El correo es obligatorio", "red");
    }
    if(!correo.includes("@")){
        return mostrar("❌ ERROR: Correo inválido (falta el @)", "red");
    }
    if(edad === "" || edad <= 0){
        return mostrar("❌ ERROR: Edad inválida", "red");
    }
    if(pass.length < 6){
        return mostrar("❌ ERROR: La contraseña debe tener mínimo 6 caracteres", "red");
    }

    // Resultado exitoso
    mostrar("✅ Formulario enviado correctamente. ¡Prueba funcional superada!", "green");
});

function mostrar(msg, color){
    let res = document.getElementById("resultado");
    res.style.display = "block";
    res.style.background = color === "red" ? "#ffb3b3" : "#b3ffcb";
    res.style.color = "#000";
    res.innerHTML = msg;
}



// 📸 GENERAR EVIDENCIA (solo imprime la pantalla)
document.getElementById("btnEvidencia").addEventListener("click", function(){
    window.print();
});
