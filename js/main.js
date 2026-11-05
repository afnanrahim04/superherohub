function validateForm() {
    // 1. Clear all previous error messages
    document.getElementById('custNameError').innerHTML = "";
    document.getElementById('custEmailError').innerHTML = "";
    document.getElementById('packageChoiceError').innerHTML = "";
    document.getElementById('durationError').innerHTML = "";

            // 1. Retrieve Form Values
            const custName = document.getElementById("custName").value.trim();
            const custEmail = document.getElementById("custEmail").value.trim();
            const packageChoice = document.getElementById("packageChoice");
            const packagePrice = parseFloat(packageChoice.value);
            const packageName = packageChoice.selectedOptions[0].text;
            const duration = parseInt(document.getElementById("duration").value);

            const shipping = document.getElementById("shippingAddon").checked ? 15 : 0;
            const insurance = document.getElementById("insuranceAddon").checked ? 25 : 0;

            let isValid = true;

            // 2. Client-Side Validation
            if (custName === "") {
                document.getElementById('custNameError').innerHTML = "First Name is required.";
                isValid = false;
            }

            // Email format basic regex check
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(custEmail)) {
                document.getElementById('custEmailError').innerHTML = "Invalid email address.";
                isValid = false;
            }
            
             if (packageChoice.value === "") {
                document.getElementById('packageChoiceError').innerHTML = "Please select a package.";
                isValid = false;
            }

            if (duration === "" ||isNaN (duration) || duration < 1 || duration > 12) {
                document.getElementById('durationError').innerHTML = "Please choose a duration.";
                isValid = false;
            }
            
            if (!isValid){
            return false;
            }

            // 3. Processing Calculation & Rules
            const monthlyAddons = shipping + insurance;
            const monthlySubTotal = packagePrice + monthlyAddons;
            const grossTotal = monthlySubTotal * duration;

            // Determine Duration-Based Discount
            let discountRate = 0;
            if (duration === 12) {
                discountRate = 0.20; // 20% discount
            } else if (duration >= 6) {
                discountRate = 0.10; // 10% discount
            } else if (duration >= 3) {
                discountRate = 0.05; // 5% discount
            }

            const discountAmount = grossTotal * discountRate;
            const finalTotal = grossTotal - discountAmount;
            const discountPercentage = discountRate * 100;

            // 4. Display Results
            const resultSection = document.getElementById("result-section");
            const resultSummary = document.getElementById("result-summary");

            resultSummary.innerHTML = `
                <p><strong>Customer:</strong> ${custName}</p>
                <p><strong>Email:</strong> ${custEmail}</p>
                <p><strong>Selected Package:</strong> ${packageName}</p>
                <p><strong>Duration:</strong> ${duration} months</p>
                <p><strong>Gross Subtotal:</strong> RM ${grossTotal.toFixed(2)}</p>
                <p><strong>Discount (${discountPercentage}%):</strong> - RM ${discountAmount.toFixed(2)}</p>
                <hr style="margin: 10px 0;">
                <p><strong>Final Subscription Total: RM ${finalTotal.toFixed(2)}</strong></p>
            `;

            resultSection.style.display = "block";
            alert("Calculation complete! Review your subscription breakdown below.");

        return false;
}