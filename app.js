;(function() {
    const entrada = document.querySelector('#entrada');
    const barra = document.querySelector('.barra-lateral');
    
    var salida;

    function crearSalida() {
        const elem = document.querySelector('#salida');
        const child = document.createTextNode('');
        
        elem.innerHTML = ''; 
        elem.appendChild(child); 
        salida = child;
    };

    crearSalida();
    
    
    window.uiCodificar = uiCodificar;
    window.uiDecodificar = uiDecodificar;
    window.uiCopiar = uiCopiar;
    
    entrada.oninput = uiSoloLetras;
    
    function Cod(x) {
        switch(x) {
            case 'e': return 'enter';
            case 'i': return 'imes';
            case 'a': return 'ai';
            case 'o': return 'ober';
            case 'u': return 'ufat';
            default : return x;
        }
    }
    
    function codificar(s) {
        var r = '';
        for (const c of s) {
            r += Cod(c);
        }
        return r;
    }
    
    function error() {
        throw new SyntaxError('codificación inválida');
    }
    
    function decodificar(s) {
        var r = ''
        for (var j = 0; j < s.length;) {
            switch(s[j]) {
            case 'e':
                if (s[j + 4] === 'r') { r += s[j]; j += 5 }
                else { error() }
                break
            case 'i':
                if (s[j + 3] === 's') { r += s[j]; j += 4 }
                else { error() }
                break
            case 'a':
                if (s[j + 1] === 'i') { r += s[j]; j += 2 }
                else { error()}
                break
            case 'o':
                if (s[j + 3] === 'r') { r += s[j]; j += 4 }
                else { error() }
                break
            case 'u':
                if (s[j + 3] === 't') { r += s[j]; j += 4 }
                else { error() }
                break
            default:
                r += s[j++]
            }
        }
        return r;
    }
    
    function mostrarResultado() {
        barra.classList.add('con-salida');
    }
    
    function ocultarResultado() {
        barra.classList.remove('con-salida');
    }
    
    const kUnAllowed = /[^a-z ]/g;
    function uiSoloLetras(ev) {
        const { inputType, target, data } = ev
        
        if (inputType === 'insertText') {
            kUnAllowed.lastIndex = 0;
            if (kUnAllowed.test(data)) {
                let value = target.value;
                target.value = value.substring(0, value.length - 1);
                alert('solamente letras minúsculas y sin acentos');
            }
        } else if(inputType === 'insertFromPaste') {
            let value = data || target.value || '';
            value = value.toLowerCase();
            target.value = value.replace(kUnAllowed, '');
            if (target.value !== value) {
                alert('se ha modificado el texto para coincidir con los carácteres permitidos');
            }
        }
    }
    
    function uiDecodificar() {
        var txt = entrada.value;
        entrada.value = '';
        if (txt.length === 0) {
            salida.nodeValue = '';
            ocultarResultado();
        } else {
            try {
            salida.nodeValue = decodificar(txt);
            } catch(O_o) {
                salida.nodeValue = 'Error: no se pudo decodificar porque la cadena no es válida';
            }
            mostrarResultado();
        }
    }
    
    function uiCodificar() {
        var txt = entrada.value;
        entrada.value = '';
        if (txt.length === 0) {
            salida.nodeValue = '';
            ocultarResultado();
        } else {
            salida.nodeValue = codificar(txt);
            mostrarResultado();
        }
    }
    
    const kClipboard = navigator.clipboard;
    function uiCopiar() {
        if (kClipboard) {
            kClipboard
            .writeText(salida.nodeValue)
            .then(() => alert('texto copiado'))
        }
    }
    
}())