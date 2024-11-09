let data = {
    fractions: ["None","Orks","Aeldari","Necrons","Drukhari","Leagues of Votann","Tyranids","Tau Empire","Genestealer Cult"
        ,"Chaos Demons","Chaos Knights","Chaos Space Marines","Death Guard","Thousand Sons","World Eaters",
        "Adepta Sororitas","Adeptus Custodes","Adeptus Mechanicus","Astra Militarum","Imperial Knights","Imperial Agents",
        "Space Marines","Dark Angels","Space Wolves","Black Templars","Grey Knights"
    ],
    add: function(){
        for (let i = 0; i < this.fractions.length; i++){
            document.getElementById("fractions").innerHTML += `<option>${this.fractions[i]}</option>`;
        }
    }
};
data.add();

let pick = {
    fractions: ["None","Orks","Aeldari","Necrons","Drukhari","Leagues of Votann","Tyranids","Tau Empire","Genestealer Cult"
        ,"Chaos Demons","Chaos Knights","Chaos Space Marines","Death Guard","Thousand Sons","World Eaters",
        "Adepta Sororitas","Adeptus Custodes","Adeptus Mechanicus","Astra Militarum","Imperial Knights","Imperial Agents",
        "Space Marines","Dark Angels","Space Wolves","Black Templars","Grey Knights"
    ],
    add: function(){
        for (let i = 0; i < this.fractions.length; i++){
            document.getElementById("fractions_2").innerHTML += `<option>${this.fractions[i]}</option>`;
        }
    }
};
pick.add();


document.getElementById("startButton").addEventListener("click", function () {
    const selectedFraction = document.getElementById("fractions").value;
    localStorage.setItem("selectedFraction", selectedFraction); // Сохраняем выбор
    window.location.href = "/round-pages/round1.html"; // Переход на следующую страницу
});


