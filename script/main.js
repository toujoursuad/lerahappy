document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

document.addEventListener('keydown', function(e) {
    if ((e.ctrlKey || e.metaKey) && (e.key === 'c' || e.key === 'C')) {
        e.preventDefault();
    }
});

const messages = [
    "Клікни де завгодно",  
    "<img src='./images/bim.jpg' alt='Image 1' width='800' height='auto'>",  // Вставка зображення через HTML
    "Ще раз ❤️",  
    "<img src='./images/bimlera1.jpg' alt='Image 2' width='500' height='auto'>", 
    "А нічо шо",  
    "Лера ти шо",  
    "<img src='./images/lera.jpg' alt='Image 3' width='500' height='auto'>", 
    "Клікни ще раз",  
    "Давай, давай не здавайся",  
    "Обіцяю, останній раз",  
    "<img src='./images/snapchat.jpg' alt='Image 2' width='500' height='auto'>", 
    "Хаха",  
    "Шутканула",  
    "Останній",  
    "<img src='./images/family3.jpg' alt='Image 2' width='500' height='auto'>", 
    "Знову повелась ахахах!",  
    "Я знаю, ти вже злишся",  
    "Хмм",  
    "Добре-добре, вже все",  
    "Я просто хотіла нагадати",  
    "Що найцінніше що в нас може бути", 
    "Це сім'я", 
    "<img src='./images/family1.jpg' alt='Image 2' width='500' height='auto'>",
    "Ахахаха", 
    "Як би вони не бісили", 
    "<img src='./images/sudia.jpg' alt='Image 2' width='500' height='auto'>",
    "Ми завжди готові підтримати", 
    "І рознести по фактам", 
    "Ахахахах",  
    "<img src='./images/family7.jpg' alt='Image 2' width='500' height='auto'>",
    "Ми нагадуємо",  
    "Шоб ти не забувала", 
    "<img src='./images/family8.jpg' alt='Image 2' width='500' height='auto'>",
    "ахахах", 
    "Що",  
    "Валерія",  
    "Ми тебе дуже любимо ❤️",  
    "<img src='./images/family4.jpg' alt='Image 2' width='500' height='auto'>",
    "І дуже тобою пишаємось",  
    "<img src='./images/sura2.jpg' alt='Image 2' width='500' height='auto'>",
    "З Днем Народження",  
    "А тепер натисни на це сердечко 💝"
];

let currentPage = 0;
let isLastPage = false;

function showMessage() {
    // Використовуємо .html() для вставки HTML-контенту
    $('.message').html(messages[currentPage]); 

    isLastPage = currentPage === messages.length - 1;

    if (isLastPage) {
        $('.next-button').show();
        $('.bg_heart').css('cursor', 'default');
    } else {
        $('.next-button').hide();
        $('.bg_heart').css('cursor', 'pointer');
    }
}

$('.bg_heart').on('click', function() {
    if (!isLastPage) {
        currentPage++;
        showMessage();
    }
});

var love = setInterval(function() {
    var r_num = Math.floor(Math.random() * 40) + 1;
    var r_size = Math.floor(Math.random() * 65) + 10;
    var r_left = Math.floor(Math.random() * 100) + 1;
    var r_bg = Math.floor(Math.random() * 25) + 100;
    var r_time = Math.floor(Math.random() * 5) + 5;
    
    $('.bg_heart').append("<div class='heart' style='width:" + r_size + "px;height:" + r_size + "px;left:" + r_left + "%;background:rgba(255," + (r_bg - 25) + "," + r_bg + ",1);animation:love " + r_time + "s ease'></div>");
    
    $('.bg_heart').append("<div class='heart' style='width:" + (r_size - 10) + "px;height:" + (r_size - 10) + "px;left:" + (r_left + r_num) + "%;background:rgba(255," + (r_bg - 25) + "," + (r_bg + 25) + ",1);animation:love " + (r_time + 5) + "s ease'></div>");
    
    $('.heart').each(function() {
        var top = parseFloat($(this).css("top"));
        var width = parseFloat($(this).css("width"));
        if (top <= -100 || width >= 150) {
            $(this).remove();
        }
    });
}, 500);

showMessage();

function clearMusicState() {
    localStorage.removeItem('musicPlaying');
    localStorage.removeItem('musicCurrentTime');
}

window.onload = function() {
    clearMusicState(); 
}

function setupMusic() {
    const music = document.getElementById('backgroundMusic');
    
    if (!localStorage.getItem('initialLoad')) {
        clearMusicState();
        localStorage.setItem('initialLoad', 'true');
        music.currentTime = 0;
    }

    const isMusicPlaying = localStorage.getItem('musicPlaying') === 'true';
    const musicCurrentTime = localStorage.getItem('musicCurrentTime') || 0;

    if (isMusicPlaying) {
        music.currentTime = parseFloat(musicCurrentTime);
        music.play().catch(error => console.log('Playback failed', error));
    }

    music.addEventListener('play', () => {
        localStorage.setItem('musicPlaying', 'true');
    });

    music.addEventListener('pause', () => {
        localStorage.setItem('musicPlaying', 'false');
    });

    setInterval(() => {
        localStorage.setItem('musicCurrentTime', music.currentTime);
    }, 1000);

    document.addEventListener('click', function startMusic() {
        music.play().catch(error => {
            console.log('Autoplay prevented', error);
        });
        document.removeEventListener('click', startMusic);
    });
}

document.addEventListener('DOMContentLoaded', setupMusic);
