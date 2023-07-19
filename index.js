$(document).ready(function() {


    $('.icon-dice').hover(function(){
        $('.dice-background').addClass('dice-hover');
    }, function() {
      $('.dice-background').removeClass('dice-hover');

      $(document).on('click', function(event) {
        if (!$(event.target).closest('.icon-dice').length) {
          $('.dice-background').removeClass('dice-hover');
        }
      });

    });

    $('#generatorBtn').click(function() {

    var adviceList = [];

    function generateAdvice() {
        var randomIndex = Math.floor(Math.random() * adviceList.length);
        var randomAdvice = adviceList[randomIndex];
        $('#advice').text(randomAdvice);

        var adviceId = Math.floor(Math.random() * 300) + 1;
        $('.adviceId').text(adviceId);
    }

    function fetchAdvice(){
    fetch('https://api.adviceslip.com/advice')
    .then(response => response.json())
    .then(data => {
        adviceList.push(data.slip.advice);
        generateAdvice();
    })
    .catch(error => {
        console.error('Error fetching advice data:', error);
    });
    }

    function saveAdviceList() {
        localStorage.setItem('adviceList', JSON.stringify(adviceList));
    }

    function loadAdviceList() {
        var storedAdviceList = localStorage.getItem('adviceList');
        if (storedAdviceList) {
          adviceList = JSON.parse(storedAdviceList);
        }
    }

    loadAdviceList();
    if (adviceList.length === 0) {
        fetchAdvice();
    } else {
        generateAdvice();
    }

    });
    
})