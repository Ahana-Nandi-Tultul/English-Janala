const loadLessons = async() => {
    const res = await fetch("https://openapi.programming-hero.com/api/levels/all");
    const json = await res.json();
    displayLessons(json.data);
}

const displayLessons = (lessons) => {
    //console.log(lessons);
    const levelContainer = document.getElementById("level-container");
    levelContainer.innerHTML = ``;

    lessons.forEach(lesson => {
        const btnDiv = document.createElement('div');
        btnDiv.innerHTML = `<button onclick="loadLevelWord(${lesson.level_no})"  class="btn btn-outline btn-primary">
                            <i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}</button>`;
        
        levelContainer.append(btnDiv);
    })
    
}

const loadLevelWord = async(level) => {
    const url = `https://openapi.programming-hero.com/api/level/${level}`;
    const res = await fetch(url);
    const data = await res.json();
    displayLevelWords(data.data);
}

const displayLevelWords = (words) => {
    console.log(words);

    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = " ";

    words.forEach(word => {
        const card = document.createElement('div');

        card.innerHTML = `
       <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
            <h2 class="font-bold text-2xl">${word.word}</h2>
            <p class="font-semibold">Meaning /Pronounciation</p>
            <div class="font-bangla font-semibold text-2xl">"${word.meaning} / ${word.pronunciation}"</div>
            <div class="flex justify-between">
                <button  class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80] "><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
            </div>
        </div>
        `;
        wordContainer.append(card);
    })
}

loadLessons();