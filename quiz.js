var jsonString = '{"quiz": [{"question": "Which one is correct team name in NBA?","options": ["New York Bulls","Los Angeles Kings", "Golden State Warriors", "Houston Rockets"]},{"question": "\'Namaste\' is a traditional greeting in which Asian language?", "options": ["Hindi", "Mandarin","Nepalese","Thai"]},{"question": "The Spree river flows through which major European capital city?", "options": ["Berlin","Paris","Rome", "London"]},{"question": "Which famous artist had both a \'Rose Period\' and a \'Blue Period\'?","options":["Pablo Picasso", "Vincent van Gogh", "Salvador Dalí","Edgar Degas"]}]}';


        var quizData = JSON.parse(jsonString);


        function displayQuiz(quizData) {
            var quizContainer = document.getElementById('quiz-container');
            var savedAnswers = JSON.parse(localStorage.getItem('quizAnswers'));

            quizData.quiz.forEach((item, index) => {

                var questionDiv = document.createElement('div');
                questionDiv.className = 'question';

                var questionTitle = document.createElement('h2');
                questionTitle.innerHTML = `Question ${index + 1}: ${item.question}`;
                questionDiv.appendChild(questionTitle);

                var optionsList = document.createElement('ul');
                optionsList.className = 'options';

                item.options.forEach(option => {
                    var optionItem = document.createElement('li');

                    var radioInput = document.createElement('input');
                    radioInput.type = 'radio';
                    radioInput.name = `question${index}`;
                    radioInput.value = option;
                    if (savedAnswers[`question${index}`] === option) {
                        radioInput.checked = true;
                    }
                    radioInput.addEventListener('change', () => saveAnswer(`question${index}`, option));
                    optionItem.appendChild(radioInput);

                    var optionLabel = document.createElement('label');
                    optionLabel.textContent = option;
                    optionItem.appendChild(optionLabel);

                    optionsList.appendChild(optionItem);
                });

                questionDiv.appendChild(optionsList);
                quizContainer.appendChild(questionDiv);
            });
        }


        function saveAnswer(question, answer) {
            var savedAnswers = JSON.parse(localStorage.getItem('quizAnswers'));
            savedAnswers[question] = answer;
            localStorage.setItem('quizAnswers', JSON.stringify(savedAnswers));
        }


        displayQuiz(quizData);