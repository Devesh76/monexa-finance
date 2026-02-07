// ==========================================
// 1. EMAIL SETUP (EmailJS)
// ==========================================

// Initialize EmailJS
(function(){
    // REPLACE 'YOUR_PUBLIC_KEY' WITH YOUR ACTUAL KEY FROM EMAILJS DASHBOARD
    emailjs.init("YOUR_PUBLIC_KEY");
})();

function sendJobApplication(e) {
    e.preventDefault(); // Stop page from refreshing

    // Get values
    let name = document.getElementById("jobName").value;
    let email = document.getElementById("jobEmail").value;
    let phone = document.getElementById("jobPhone").value;
    let role = document.getElementById("jobRole").value;
    let resume = document.getElementById("jobResume").value;
    let btn = document.getElementById("btnText");

    btn.innerText = "Sending...";

    // Prepare parameters matching your EmailJS template
    var templateParams = {
        to_name: "Preet Singh",
        from_name: name,
        from_email: email,
        phone_number: phone,
        job_role: role,
        resume_link: resume
    };

    // Send Mail
    // REPLACE 'YOUR_SERVICE_ID' AND 'YOUR_TEMPLATE_ID'
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            alert("Application Sent Successfully to Monexa HR!");
            document.getElementById("jobForm").reset();
            btn.innerText = "Submit Application";
        }, function(error) {
            console.log('FAILED...', error);
            alert("Failed to send. Please try again or contact via WhatsApp.");
            btn.innerText = "Submit Application";
        });
}


// ==========================================
// 2. LOAN CALCULATOR LOGIC
// ==========================================

function switchTab(tabName) {
    // Hide all calculator boxes
    let boxes = document.getElementsByClassName("calculator-box");
    for(let box of boxes) {
        box.classList.remove("active");
    }
    
    // Deactivate all buttons
    let buttons = document.getElementsByClassName("tab-btn");
    for(let btn of buttons) {
        btn.classList.remove("active");
    }

    // Show selected
    document.getElementById(tabName).classList.add("active");
    
    // Highlight button (Simple logic finding the button based on text would be better, 
    // but for simplicity we rely on the click event)
    event.currentTarget.classList.add("active");
}

function calculateEMI() {
    let principal = parseFloat(document.getElementById("emiAmount").value);
    let rate = parseFloat(document.getElementById("emiRate").value);
    let years = parseFloat(document.getElementById("emiYears").value);

    if(!principal || !rate || !years) {
        alert("Please fill all fields");
        return;
    }

    let monthlyRate = rate / 12 / 100;
    let months = years * 12;

    // EMI Formula: [P x R x (1+R)^N]/[(1+R)^N-1]
    let emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    
    let totalPayment = emi * months;

    document.getElementById("monthlyEmiDisplay").innerText = "₹" + Math.round(emi).toLocaleString();
    document.getElementById("totalAmountDisplay").innerText = "₹" + Math.round(totalPayment).toLocaleString();
    document.getElementById("emiResult").style.display = "block";
}

function calculateGoldLoan() {
    let weight = parseFloat(document.getElementById("goldWeight").value);
    let carat = parseInt(document.getElementById("goldCarat").value);

    if(!weight) {
        alert("Please enter weight in grams");
        return;
    }

    // Current Gold Rate assumptions (Can be updated)
    // Example: 1 gram 24k = 6000 INR
    let baseRate = 6000; 
    let purityFactor = 1;

    if(carat === 22) purityFactor = 0.916;
    if(carat === 18) purityFactor = 0.75;

    // Loan-to-Value (LTV) Ratio usually 75% for gold loans
    let ltv = 0.75;

    let totalValue = weight * baseRate * purityFactor;
    let loanAmount = totalValue * ltv;

    document.getElementById("goldValueDisplay").innerText = "₹" + Math.round(loanAmount).toLocaleString();
    document.getElementById("goldResult").style.display = "block";
}