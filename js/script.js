(function(){

    if(!window.FileReader) return;

    // inputFile.onchange = function(e) {

    //     var file = this.files[0],

    //     if(file.type === "text/plain") {

    //         reader.onload = function(e) {
    //             convertedField.value = reader.result;
    //         };

    //         reader.readAsText(file);

    //     } else {
    //         convertedField.value = "Cannot read file. Please choose text type file.";
    //     }

        var converter = {

            init: function() {

                this.showDown = new showdown.Converter();
                this.reader = new FileReader();
                this.inputFile = document.querySelector("#choose-file");
                this.convertedField = document.querySelector("#converted-file-field");
                this.copyButton = document.querySelector("#copy-button");

                this.inputFile.onchange = this.readFile.bind(this);
                this.copyButton.onclick = this.copyToClipboard.bind(this);
                     
            },

            readFile: function(e) {
                this.file = this.inputFile.files[0];

                if(this.checkFileType()){
                    this.reader.onload = this.displayConverted.bind(this);
                    this.reader.readAsText(this.file);
                } else {
                    this.convertedField.value = "Cannot read file. Please choose text type file.";
                }
            },

            convertToHTML: function() {
                var file = this.reader.result;
                this.convertedFile = this.showDown.makeHtml(file);
            },

            displayConverted: function(e) {
                this.convertToHTML();
                this.convertedField.value = this.convertedFile;
            },

            copyToClipboard: function(e) {
                if(this.convertedField.value !== "") {
                    this.convertedField.select();
                    document.execCommand('copy');
                }
            },

            checkFileType: function() {
                return (this.file.type === "text/plain") ? true : false;
            } 
        };

        converter.init(); 

    // }

})();

