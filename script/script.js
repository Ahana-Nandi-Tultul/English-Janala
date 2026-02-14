const loadLessons = async() => {
    const res = await fetch("https://openapi.programming-hero.com/api/levels/all");
    const json = await res.json();
    displayLessons(json.data);
}

const showDefaultMessage = () => {
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = `
        <div class="text-center col-span-full rounded-xl py-10 space-y-6">
            <p class="text-xl font-medium text-gray-500">
                আপনি এখনো কোন Lesson Select করেন ন
            </p>
            <h2 class="text-3xl font-bold font-bangla">
                একটি Lesson Select করুন।
            </h2>
        </div>
    `;
}

const removeActive= () => {
    const lessonButtons = document.querySelectorAll('.lesson-btn');
    lessonButtons.forEach((btn) => btn.classList.remove('active'));
}

const displayLessons = (lessons) => {
    //console.log(lessons);
    const levelContainer = document.getElementById("level-container");
    levelContainer.innerHTML = ``;

    lessons.forEach(lesson => {
        const btnDiv = document.createElement('div');
        btnDiv.innerHTML = `<button id = "lesson-btn-${lesson.level_no}"
         onclick="loadLevelWord(${lesson.level_no})"  class="
        lesson-btn btn btn-outline btn-primary">
                            <i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}</button>`;
        
        levelContainer.append(btnDiv);
    })
    
}

const loadLevelWord = async(level) => {
    const url = `https://openapi.programming-hero.com/api/level/${level}`;
    const res = await fetch(url);
    const data = await res.json();
    removeActive();
    const clickbtn = document.getElementById(`lesson-btn-${level}`);
    // console.log(clickbtn);

    clickbtn.classList.add('active')
    displayLevelWords(data.data);
}

const displayLevelWords = (words) => {
    // console.log(words);

    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = ``;

    if(words.length == 0)
    {
        wordContainer.innerHTML = `
        <div class="text-center  col-span-full rounded-xl py-10 space-y-6">
                <img class="mx-auto" src="./assets/alert-error.png" alt="" srcset="">
                <p class="text-xl font-medium text-gray-500">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                <h2 class="font-6xl font-bold font-bangla">নেক্সট Lesson এ যান</h2>

            </div>
    `;
        return;
    }

    words.forEach(word => {
        const card = document.createElement('div');

        card.innerHTML = `
       <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
            <h2 class="font-bold text-2xl">${word.word ? word.word : "Word Not Found"}</h2>
            <p class="font-semibold">Meaning /Pronounciation</p>
            <div class="font-bangla font-semibold text-2xl">"${word.meaning ?word.meaning:
                "Meaning Not Found"
             } / ${word.pronunciation ? word.pronunciation: "Pronunciation Not Found" }"</div>
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
showDefaultMessage();