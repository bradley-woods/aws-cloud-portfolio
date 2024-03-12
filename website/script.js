document.addEventListener('DOMContentLoaded', function () {
    const input = document.getElementById('commandInput');
    let commandHistory = [];
    let commandIndex = 0;

    setInterval(function () {
        if (document.activeElement !== input) {
            input.focus();
        }
    }, 100);

    input.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            handleCommand(input.value);
            commandHistory.push(input.value);
            commandIndex = commandHistory.length;
            input.value = '';
        } else if (event.key === 'ArrowUp') {
            // Navigate up through command history
            if (commandIndex > 0) {
                commandIndex--;
                input.value = commandHistory[commandIndex];
            }
        } else if (event.key === 'ArrowDown') {
            // Navigate down through command history
            if (commandIndex < commandHistory.length - 1) {
                commandIndex++;
                input.value = commandHistory[commandIndex];
            } else {
                // Clear input when at the bottom of history
                input.value = '';
            }
        }
    });
    handleCommand('welcome');
});

function generateSpaces(count) {
    return Array(count + 1).join('\u00a0');
}

function handleCommand(command) {
    const terminal = document.getElementById('terminal');

    // Create a new line for the command with user@bradley-woods.com:~$ prefix
    const commandLine = document.createElement('div');
    commandLine.className = 'line output-line';

    // Create a span for the tag and set its color
    const tagSpan = document.createElement('span');
    tagSpan.className = 'tag';
    tagSpan.innerHTML = 'user@bradley-woods.com:~$&nbsp;';
    tagSpan.style.color = '#ffb347'; // Change this to your desired color

    // Append the tag span to the command line
    commandLine.appendChild(tagSpan);

    // Create a span for the command text
    const commandSpan = document.createElement('span');
    commandSpan.textContent = command; // Replace with your actual command

    // Append the command span to the command line
    commandLine.appendChild(commandSpan);

    terminal.appendChild(commandLine);

    switch (command.toLowerCase()) {
        case 'help':
            const helpText = [
                'Available commands:',
                '- help' + generateSpaces(12) + 'Lists available commands',
                '- welcome' + generateSpaces(9) + 'Displays welcome message',
                '- about' + generateSpaces(11) + 'Get to know me, Bradley',
                '- cv' + generateSpaces(14) + 'Download and view my CV',
                '- github' + generateSpaces(10) + 'View my GitHub profile',
                '- linkedin' + generateSpaces(8) + 'View my LinkedIn profile',
                '- clear' + generateSpaces(11) + 'Clears command history',
            ];
            helpText.forEach(line => appendResponse(line));
            break;                        
        case 'about':
            const aboutText = [
                "Hi, I'm Bradley, a problem-solving enthusiast with a background in mechanical engineering.",
                'From fixing gadgets to automating business processes, I love finding solutions. My outdoor',
                'pursuits include running and rock climbing, adding more problem-solving fun. With over four',
                'years in a manufacturing plant, I developed a passion for automation, creating tools like a',
                'Python script or Excel macro to help improve the department. My interest in DevOps ignited',
                'leading me to complete the Cisco DevNet course and earn AWS, Azure and K8s certifications.',
                ' ',
                'Volunteering at a non-profit, I collaborate with DevOps engineers and Solution Architects',
                'to assist charities with tech needs. Now, I want to develop my career as a DevOps engineer',
                'gaining valuable cloud experience. Looking ahead, I aspire to become a Solutions Architect',
                'utilising cloud technologies to craft comprehensive solutions for clients.',
            ];
            aboutText.forEach(line => appendResponse(line));
            break;
        case 'skills':
            appendResponse('My skills include HTML, CSS, JavaScript, and more!');
            break;
        case 'contact':
            appendResponse('You can reach me at example@email.com');
            break;
        case 'clear':
            clearTerminal();
            break;
        case 'welcome':
            appendASCIIArt(asciiArtWelcome);
            appendResponse('Welcome to my terminal portfolio website!');
            appendResponse("For a list of available commands, type 'help'.");
            break;
        case 'cv':
            const cvUrl = 'cv.pdf';
            // Open the PDF in a new tab
            window.open(cvUrl, '_blank');
            break;
        case 'github':
            const githubUrl = 'https://github.com/bradley-woods';
            window.open(githubUrl, '_blank');
            break;
        case 'linkedin':
            const linkedinUrl = 'https://www.linkedin.com/in/bradley-christian-woods/';
            window.open(linkedinUrl, '_blank');
            break;

        default:
            appendResponse(`Command not recognised: '${command}'`);
    }

    // Add a new input line after handling the command
    const inputLine = document.querySelector('.input-line');
    terminal.appendChild(inputLine);

    scrollToBottom();
}

function clearTerminal() {
    const terminal = document.getElementById('terminal');
    
    // Remove all child elements that are output lines
    const outputLines = document.querySelectorAll('.output-line');
    outputLines.forEach((outputLine) => {
        terminal.removeChild(outputLine);
    });
}



function appendResponse(response) {
    const terminal = document.getElementById('terminal');
    const newLine = document.createElement('div');
    newLine.className = 'line output-line';
    newLine.textContent = response;
    terminal.appendChild(newLine);
}

function appendASCIIArt(asciiArt) {
    const terminal = document.getElementById('terminal');
    const asciiArtContainer = document.createElement('div');
    asciiArtContainer.innerHTML = '<pre>' + asciiArt + '</pre>';
    asciiArtContainer.className = 'line output-line ascii-art';
    terminal.appendChild(asciiArtContainer);
}

function scrollToBottom() {
    const terminal = document.getElementById('terminal');
    terminal.scrollTop = terminal.scrollHeight;
}

const asciiArtWelcome = `                                                         
                                                                                    /\\            
                                                                                   /  \\              
    ____                 ____              _       __                __           /^v^v\\   /\\     
   / __ )_________  ____/ / /__  __  __   | |     / /___  ____  ____/ /____      /      \\ /^^\\    
  / __  / ___/ __ \`/ __  / / _ \\/ / / /   | | /| / / __ \\/ __ \\/ __  / ___/     /  /\\    /    \\
 / /_/ / /  / /_/ / /_/ / /  __/ /_/ /    | |/ |/ / /_/ / /_/ / /_/ (__  )     /  /  \\  /      \\
/_____/_/   \\__,_/\\__,_/_/\\___/\\__, /     |__/|__/\\____/\\____/\\__,_/____/     /  /    \\/ /\\     \\ 
                              /____/                                         /  /      \\/  \\/\\   \\
                                                                _  _ _______/__/       /   /  \\___\\____
`;

const viewCount = document.querySelector(".view-count");
async function updateViews() {
    let response = await fetch("https://pin1z3hd2d.execute-api.eu-west-2.amazonaws.com/dev");
    let data = await response.json();
    viewCount.innerHTML = ` Views: ${data}`;
}

updateViews();