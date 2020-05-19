
let posiblesPalabrasLevel1 = ['banana', 'tomate', 'manzana', 'naranja',
    'ciruela', 'kiwi', 'frutilla', 'sandia', 'cereza', 'pomelo',
    'arandano', 'fresa', 'melon', 'limon'];
let posiblesPalabrasLevel2 = ['regla', 'clips', 'legajo', 'minuta',
    'centro', 'sede', 'recibo', 'circular', 'anuario',
    'lapiz', 'mesa', 'ficha', 'fichero', 'grapa', 'sueldo', 'horas', 'carpeta', 'folio', 'reunion', 'jefe'];
let posiblesPalabrasLevel3 = ['papagaya', 'aplastada', 'harta', 'nalga',
    'masa', 'chapa', 'carpa', 'saldra', 'calla', 'rasca',
    'chacra', 'grasa', 'bala', 'balanza', 'trabaja', 'alza', 'halaga', 'mala', 'malla', 'maya',
    'vaya', 'valla', 'vaca', 'baraja', 'calma', 'playa', 'laja', 'barata'];
var levels = [new Level(posiblesPalabrasLevel1, 10, 10, 5, { backwards: 0 },60), new Level(posiblesPalabrasLevel2, 15, 15, 7, { backwards: 0.3 },180), new Level(posiblesPalabrasLevel3, 15, 15, 10, { backwards: 0.6, letters: 'aaaaaaaaaaaaaaaaaaaaaaaaabcdfghjklmnpqrstvwxyz' },360)];
var draftedWordsPerLevel=[levels[0].draftedWords,levels[1].draftedWords,levels[2].draftedWords]; 
var makeLevelGreatAgain = function (neededLevel) {
    switch (neededLevel) {
        case 0:
            levels[0] = new Level(posiblesPalabrasLevel1, 10, 10, 5, { backwards: 0 },60);
            draftedWordsPerLevel[0]=levels[0].draftedWords;
            break;
        case 1:
            levels[1] = new Level(posiblesPalabrasLevel2, 15, 15, 7, { backwards: 0.3 },180);
            draftedWordsPerLevel[1]=levels[1].draftedWords;
            break;
        case 2:
            levels[2] = new Level(posiblesPalabrasLevel3, 15, 15, 10, { backwards: 0.6, letters: 'aaaaaaaaaaaaaaaaaaaaaaaaabcdfghjklmnpqrstvwxyz' },360);
            draftedWordsPerLevel[2]=levels[2].draftedWords;
            break;
    }
    return levels[neededLevel];
};