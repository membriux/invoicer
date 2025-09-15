// Bi-Weekly Company Invoice Cycle Management
class CompanyInvoiceManager {
    constructor() {
        this.companyData = JSON.parse($('#companyData').text());
        this.currentCompany = $('#company').text();
        this.cycleInput = $('#cycle');
        this.cycleInitText = $('.cycleInit');
        this.cycleEndText = $('.cycleEnd');
        this.currentCycleText = $('#currentCycleText');
        this.companyInfo = $('#company').text();
        this.cycleDays = 14; // Bi-weekly = 14 days

        this.init();
    }

    // Get initial date for current company (when Cycle #1 starts)
    getInitialDate() {
        const dateStr = this.companyData[this.currentCompany].initialDate;
        // Parse date string as MM/DD/YYYY to avoid timezone issues
        const [month, day, year] = dateStr.split('/');
        return new Date(year, month - 1, day);
    }

    // Calculate current bi-weekly cycle number
    getCurrentCycle() {
        const now = new Date();
        const initialDate = this.getInitialDate();

        // Calculate days difference
        const diffTime = now.getTime() - initialDate.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        // If we're before the start date, we're in cycle 1 (future)
        if (diffDays < 0) {
            return 1;
        }

        // Calculate which bi-weekly cycle we're in
        return Math.floor(diffDays / this.cycleDays) + 1;
    }

    // Get cycle date range based on cycle number
    getCycleRange(cycle) {
        const initialDate = this.getInitialDate();

        // Calculate start date for this cycle
        const cycleStartDate = new Date(initialDate.getTime());
        cycleStartDate.setDate(cycleStartDate.getDate() + ((cycle - 1) * this.cycleDays));

        // Calculate end date for this cycle (13 days later, so 14 days total)
        const cycleEndDate = new Date(cycleStartDate.getTime());
        cycleEndDate.setDate(cycleEndDate.getDate() + this.cycleDays - 1);

        // Format dates for display
        const startStr = cycleStartDate.toLocaleDateString('en-US');
        const endStr = cycleEndDate.toLocaleDateString('en-US');

        // Update display and form values
        this.cycleInitText.text(startStr);
        this.cycleInitText.val(startStr);

        this.cycleEndText.text(endStr);
        this.cycleEndText.val(endStr);

        return {
            start: cycleStartDate,
            end: cycleEndDate,
            startStr: startStr,
            endStr: endStr
        };
    }

    // Update cycle text and calculate date range
    updateCycleText(cycle) {
        this.cycleInput.val(cycle);
        this.currentCycleText.text(cycle);
        const cycleInfo = this.getCycleRange(cycle);

        console.log(`Cycle ${cycle}: ${cycleInfo.startStr} - ${cycleInfo.endStr}`);
        return cycleInfo;
    }

    // Handle cycle input change
    onCycleChange() {
        const cycle = this.cycleInput.val();
        this.updateCycleText(cycle);
    }

    // Refresh iframe after invoice generation
    refresh() {
        setTimeout(() => {
            $('iframe').attr('src', 'invoice.pdf');
            console.log('Invoice generated and refreshed');
        }, 1500);
    }

    // Initialize the manager
    init() {
        const currentCycle = this.getCurrentCycle();

        // Set max cycle value and update display
        this.cycleInput.attr('max', currentCycle + 10); // Allow future cycles
        this.updateCycleText(currentCycle);

        // Add event listeners
        this.cycleInput.on('change', () => this.onCycleChange());
        $('#companySelect').on('change', () => this.onCompanyChange());

        // Update company info display
        this.updateCompanyInfo();

        // Log initialization
        console.log(`Bi-Weekly Invoice Manager initialized for ${this.companyInfo}`);
        console.log(`Current cycle: ${currentCycle}`);
        console.log(`Initial date: ${this.getInitialDate().toDateString()}`);
        console.log(`Cycle length: ${this.cycleDays} days`);
    }

    // Update company information display
    updateCompanyInfo() {
        const company = this.companyData[this.currentCompany];
        const initialDate = this.getInitialDate();
        const currentCycle = this.getCurrentCycle();

        $('#companyInfo').html(`
            <strong>${company.header}</strong> - Rate: $${company.rate}/hr<br>
            Started: ${initialDate.toLocaleDateString()} | Current Cycle: ${currentCycle} (Bi-Weekly)
        `);
    }

    // Handle company change
    onCompanyChange() {
        const selectedCompany = $('#companySelect').val();
        if (selectedCompany) {
            // Update current company
            this.currentCompany = selectedCompany;

            // Update hidden company field
            $('.company').val(selectedCompany);
            $('#company').text(selectedCompany);

            // Recalculate cycle based on new company's initial date
            const newCurrentCycle = this.getCurrentCycle();
            this.cycleInput.attr('max', newCurrentCycle + 10);

            // Set cycle to current cycle for new company
            this.updateCycleText(newCurrentCycle);

            // Update company info display
            this.updateCompanyInfo();

            console.log(`Company changed to: ${selectedCompany}`);
            console.log(`New company initial date: ${this.getInitialDate().toDateString()}`);
            console.log(`New company current cycle: ${newCurrentCycle}`);
        }
    }
}

// Global functions for backward compatibility
function onCycleChange() {
    if (window.companyManager) {
        window.companyManager.onCycleChange();
    }
}

function onCompanyChange() {
    if (window.companyManager) {
        window.companyManager.onCompanyChange();
    }
}

function refresh() {
    if (window.companyManager) {
        window.companyManager.refresh();
    }
}

// Initialize when DOM is ready
$(document).ready(() => {
    window.companyManager = new CompanyInvoiceManager();
});