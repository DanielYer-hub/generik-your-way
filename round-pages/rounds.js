import TodosManager from './manager.js';

const todosManager = new TodosManager();

// Находим все кнопки с классом "toggle-btn" и добавляем обработчик клика к каждой
document.querySelectorAll('.toggle-btn').forEach((button) => {
    button.addEventListener('click', () => {
        // Находим текстовый элемент "p.miss", который находится рядом с кнопкой
        const textElement = button.previousElementSibling;
        
        // Передаем текстовый элемент и кнопку в метод toggleVisibility
        todosManager.toggleVisibility(textElement, button);
    });
});



// Определяем раунд на основе заголовка страницы
const roundTitle = document.getElementById('round-title').textContent;
const roundNumber = parseInt(roundTitle.replace(/\D/g, '')); // Извлекаем номер раунда

// Массивы миссий для каждого раунда
const missions = {
    1: {
        start: [
            "Round-1 - Attacker calls in orbital strike: Choose 1 unit from Defender army, throw D3+1 mortal wound at this unit, all units that placed '3' near this unit wich alocated atack , imidiatly got 1 mortal wound.",
            "Round 1 - Both players could choose 3 Infantry units, and imidiatly make a Normal Move '6': (only from there deployement zone.)",
            "Round 1 - Defender can imidiatly redeploy 3 units, (only in own Deployement Zone.)"
        ],
        move: [
            "Round 1 - The Attacker can make an additional Advance: (not work with Strategem.)",
            "Round 1 - Any Units which stand on markers at No Man's Land They don't even realize that mines were planted throughout the battlezone. Try your luck and don't die. Throw one D6 on '5+' the Mine got detonate, you got D3+1 Mortal Wound.",
            "Round 1 - Defender can imidiatly relocat 1 their Units in any closest Ruine: (please use at roulete to check the closest Ruine.)"
        ],
        shoot: [
            "Round 1 - Attacker can add 1 to Hit-roll for 1 Unit: (this buff can stuck with same abilities.)",
            "Round 1 - Due to acid rain, both armies have improved ballistics, all units got minus 1 for to Hit-roll.",
            "Round 1 - Defender can add 1 to Wound-roll for 1 Unit: (this buff can stuck with same abilities.)"
        ],
        end: [
            "Round 1 - If any player is affected by at least two elements from the GENERIC-WAY, he gets 1CP.",
            "Round 1 - If any player was not affected by anything from the GENERIC-WAY, then you have not suffered righteous sacrifices. Subtract 2VP if you have, But if No you can Ignore it.",
        ]
    },
    2: {
        start: [
            "Round 2 - Due to the growing tension on the battlefield, the Warp is breaking into this world, all Psyker models must pass the battleshock test : if your test was succesful your Psyker can add 2 Damage on all his weapon.",
            "Round 2 - Due to the growing tension on the battlefield, the Warp is breaking into this world, all Character which leading a unit must  pass the battleshock test : if your test was not a success, throw one D3 units which leading by your Leader leaved a battlefield.",
            "Round 2 - Due to the growing tension on the battlefield, the Warp is breaking into this world, all Monster or Vechicle units must  pass the battleshock test : if your test was not a success, this unit pass a Movement phase."
        ],
        move: [
            "Round 2 - if you Attacker maybe you thought that your Leader must be at another place: Only NOW! you can take your leader which lead one unit and placed him to another unit available to him that he can lead (look to a Leading list.) If another Unit also has a leader you can add him to this unit untill the End of the Battle round, after that back him back.",
            "Round 2 - For Defender  of this battle-zone this world was well studied and they knew how to return back to their own Deployement: you can take one Unit and deploy him at your Deployement zone (if you have any enemy Units at you deployement, You need to set-up theit '9' from enemy units.)",
            "Round 2 - Due to the incipient warp surge all Action mission are blocked until the end of this Round."
        ],
        shoot: [
            "Round 2 - Units which stayed in Ruins and got any Damage imidiatly lose Benefit of Cover from this Ruine until the End of this phase.",
            "Round 2 - Defender - if your Infantry Unit was destroyed don't remove them, your last model got a keyword 'Granade' throw this granade for 0CP.(only one Unit at this turn)",
            "Round 2 - Attacker - if one from your Unit army  successfully takes at least 3 Wounds from the enemy Unit, then the next your Unit can ignore any rools of Ruine and also shoot at this Unit: (discard 1 for to Hit-roll.)"
        ],
        end: [
            "Round 2 - If any player is affected by at least two elements from the GENERIC-WAY, You can openly choose one mission for the next round.",
            "Round 2 - If any player was not affected by at least three elements from the GENERIC-WAY, your deployement zone move down '5' on both sides (your zone is now '50' instead of '60'.) Move all units from destroyed zone and place them '1' from the edge of the area."
        ]
    },
    
    3: { 
        start: [
        "Round 3 - Warp indignation affects your leaders. The sounds of voices do not disappear in their heads , choose only one from them , all other leaders cannot us their abilities until the end of the round.(not work on Mechanicus, Necrons, Chaos Units)",
        "Round 3 - Warp Gods want more Victims! Move All Objective markers on '6' to the center off table.",
        "Round 3 - Warp play own game with a Battlefield , both players can replace one Terraine and place him in anywhere on battlefield: you can't choose one Terraine twice."
    ],
    //shoot
    move: [
        "Round 3 - At real life all Ruins can be destroide, if you shoot in one Ruine twice where was replaced any Units, the second player which Units placed in this Terraine need throw one D6 on '5+' the Ruine will stand , less: you need remove this Ruine from battlefield and all Units which stand in Ruine zone are Hidden under the rubble(this Units couldn't be eligible for Shoot, Charge, Fight and make Action Mission for this Round from both sides.) ",
        "Round 3 - Attacker only two First Units which will be shoot (ignore It if you Tyranids, Necrons, Tau, Thousand Sons Units) throw two D6 on '6+' your Unit can make a Shooting Action , less: this Units understood that their weapons are empty and their pass this phase.",
        "Round 3 - Defender only Units which placed closest to the Center of Table max. '9' (ignore It if you Imperium, Aeldari, Leagues of Vottan Units) after the End of shooting, move your Units on '4' in the direction the unit is facing."
    ],
    //fight
    shoot: [
        "Round 3 - Attacker - if your Units damaged half and more from opponent Unit at this phase you can make additional fight with minus '1' to Hit-roll, and just after that opponent Unit finish Fight with you.",
        "Round 3 - Defender - just after if you used Overwatch Strategem and opponent Unit stay in Engagement range from your Unit you can use Overwatch Strategem one more time for 0CP (half your 'Attack' example: Unit stats 'Attack = 5' for this action Unit stats 'Attack = 2'.)",
        "Round 3 - First line Fall first: If Unit which was allocated 'Damage' and loose models a player must remove models which stay base to base or closest to opponents models:(you can't remove models which you want, excluding ' Leaders and Characters'.)"
    ],
        end: [
        "Round 3 - If any player is affected by at least two elements from the GENERIC-WAY, he gets 1CP.",
        "Round 3 - If any player was not affected by at least three elements from the GENERIC-WAY, your deployement zone move down '10' on both sides (your zone is now '40' instead of '60'.)  Move all units from destroyed zone and place them '1' from the edge of the area."
    ]
},
    4: {  
        start: [
        "Round 4 - Both players (excluding: Necrons) send emergency request to their reserves, back to battle one your destroyed Unit until '150pts': ( placed your Unit like that was strategy Reserves.)",
        "Round 4 - EXTERMINATUS - and may you not fall into anyone's hands! Both players must remove their Objective Markers from  deployement zone.",
        "Round 4 - The weakest player by Victory Points one per Round can off all abilities at one opponent Unit."
    ],
    move: [
        "Round 4 - Due to storms caused by the hot phase of the battle, all units (excluding: Death Guard, Chaos Knight, Imperial Knight, Adeptus Custodes Units) have a minus '-3' Movement penalty.",
        "Round 4 - Defender - 1 Infantry Unit can Pass their Movement Phase and make free charge with this Unit without dice roll.",
        "Round 4 - Attacker - after Normal Move one Unit (excluding: Monster/Vehicle) and be placed ourselves outside the fire range, can put ONE additional Objective Marker not closest '6' to other Objective only for this Round (this Marker available for Action.)"
    ],
    //charge
    shoot: [
        "Round 4 - If Units not leading by any Characters must subtract '2' for the Charge.",
        "Round 4 - Defender - if Attacker failed the Charge phase then the unit that was chosen to attack can perform a Counter-Charge, make a Charge as if it was your phase:(Fight phase is not available for both players.)",
        "Round 4 - Attacker - after succesful Charge you can make a Pile-In on '6'."
    ],
    end: [
        "Round 4 - If any player is affected by at least two elements from the GENERIC-WAY, you can back '3' Wounds at 2 of Your Units.",
        "Round 4 - If any player was not affected by at least three elements from the GENERIC-WAY,your deployement zone move down '4' on both sides (your zone is now '36' instead of '44'.)  Move all units from destroyed zone and place them '1' from the edge of the area."
    ]
},
    5: {  start: [
        "Round 5 - All your army after long battle have '0'OC. ",
        "Round 5 - All your army after long battle have -1 Damage on their weapons:(can't be less than one.)"
    ],
    //shooting
    move: [
        "Round 5 - The player which got more VP can use one Strategem twice for 0Cp:(only one time at this round.)",
        "Round 5 - The player which got less VP can choose two Units: 1-st Unit have on their range weapon Devastaiting Wounds, 2-ed Unit have on their range weapon Lethal Hits. "
    ],
    //fight
    shoot: [
        "Round 5 - The player which First Allocated attack, only for one Unit which fight first: (Degradating Units can ignore minus to Hit-roll, if your Unit lost a models you can add all attacks from them to this fight. ",
        "Round 5 - Defender- only one Unit can be choose for this:(you got 4+ invulnerable save or 4+ FNP.)",
    ],
    end: [
        "Round 5 - If any player is affected by at least two elements from the GENERIC-WAY, can add 10VP.",
        "Round 5 - If any player was not affected by at least three elements from the GENERIC-WAY, the player which have the less VP can choose one from the mission which was completed, imidiatly can add max VP from this card."
    ]
}
};

//Функция для генерации случайных миссий
function getRandomDescription(descriptions) {
const randomIndex = Math.floor(Math.random() * descriptions.length);
return descriptions[randomIndex];
}

// // Проверяем, существует ли массив миссий для данного раунда
if (missions[roundNumber]) {
    document.querySelector("#start p").textContent = getRandomDescription(missions[roundNumber].start);
    document.querySelector("#move p").textContent = getRandomDescription(missions[roundNumber].move);
    document.querySelector("#shoot p").textContent = getRandomDescription(missions[roundNumber].shoot);
    document.querySelector("#end p").textContent = getRandomDescription(missions[roundNumber].end);
} else {
    console.error("Not found missions for this round.");
}


































// One from work options
// const startDescriptions = [
//     "Attacker calls in orbital strike: Choose 1 unit from Defender army, throw D3+1 mortal wound at this unit, all units that placed '3' near this unit wich alocated atack , imidiatly got 1 mortal wound.",
//     "Both players could choose 3 Infantry units, and imidiatly make a Normal Move '6': (only from there deployement zone.)",
//     "Defender can imidiatly redeploy 3 units, (only in own Deployement Zone.)"
// ];

// const moveDescriptions = [
//     "The Attacker can make an additional Advance: (not work with Strategem.)",
//     "Any Units which stand on markers at No Man's Land They don't even realize that mines were planted throughout the battlezone. Try your luck and don't die. Throw one D6 on '5+' the Mine got detonate, you got D3+1 Mortal Wound.",
//     "Defender can imidiatly relocat 1 their Units in any closest Ruine: (please use at roulete to check the closest Ruine.)"
// ];

// const shootDescriptions = [
//     "Attacker can add 1 to Hit-roll for 1 Unit: (this buff can stuck with same abilities.)",
//     "Due to acid rain, both armies have improved ballistics, all units got minus 1 for to Hit-roll.",
//     "Defender can add 1 to Wound-roll for 1 Unit: (this buff can stuck with same abilities.)"
// ];

// const endDescriptions = [
//     "If any player is affected by at least two elements from the GENERIC-WAY, he gets 1CP.",
//     "If any player was not affected by anything from the GENERIC-WAY, then you have not suffered righteous sacrifices. Subtract 2VP if you have, But if No you can Ignore it.",
    
// ];

// function getRandomDescription(descriptions) {
//     const randomIndex = Math.floor(Math.random() * descriptions.length);
//     return descriptions[randomIndex];
// }
// document.querySelector("#start p").textContent = getRandomDescription(startDescriptions);
// document.querySelector("#move p").textContent = getRandomDescription(moveDescriptions);
// document.querySelector("#shoot p").textContent = getRandomDescription(shootDescriptions);
// document.querySelector("#end p").textContent = getRandomDescription(endDescriptions);