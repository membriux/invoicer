// Universal Company Invoice Cycle Management
class CompanyInvoiceManager {
    constructor() {
        this.companyData = JSON.parse($('#companyData').text());
        this.currentCompany = $('#company').text();
        this.cycleInput = $('#cycle');
        this.cycleInitText = $('.cycleInit');
        this.cycleEndText = $('.cycleEnd');
        this.currentCycleText = $('#currentCycleText');
        this.companyInfo = $('#company').text();
        
        this.init();
    }

    // Get initial date for current company
    getInitialDate() {
        return new Date(this.companyData[this.currentCompany].initialDate);
    }

    // Calculate months difference from initial date to now
    monthDiff() {
        const now = new Date();
        const initialDate = this.getInitialDate();
        let months = (now.getFullYear() - initialDate.getFullYear()) * 12;
        months -= initialDate.getMonth();
        months += now.getMonth() + 1;
        return months;
    }

    // Get cycle date range based on cycle number
    getCycleRange(cycle) {
        const initCycle = new Date(this.getInitialDate());
        const newMonth = initCycle.getMonth() + parseInt(cycle);
        
        initCycle.setMonth(newMonth);
        
        const endCycle = new Date(initCycle);
        endCycle.setMonth(initCycle.getMonth() + 1);

        // Update display and form values
        this.cycleInitText.text(initCycle.toString().slice(0, 16));
        this.cycleInitText.val(initCycle.toString().slice(0, 16));

        this.cycleEndText.text(endCycle.toString().slice(0, 16));
        this.cycleEndText.val(endCycle.toString().slice(0, 15));
    }

    // Update cycle text and calculate date range
    updateCycleText(cycle) {
        this.cycleInput.val(cycle);
        this.currentCycleText.text(cycle);
        this.getCycleRange(cycle);
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
        const currentCycle = this.monthDiff();
        
        // Set max cycle value and update display
        this.cycleInput.attr('max', currentCycle);
        this.updateCycleText(currentCycle);
        
        // Add event listeners
        this.cycleInput.on('change', () => this.onCycleChange());
        $('#companySelect').on('change', () => this.onCompanyChange());
        
        // Update company info display
        this.updateCompanyInfo();
        
        // Log initialization
        console.log(`Company Invoice Manager initialized for ${this.companyInfo}`);
        console.log(`Current cycle: ${currentCycle}`);
        console.log(`Initial date: ${this.getInitialDate().toDateString()}`);
    }

    // Update company information display
    updateCompanyInfo() {
        const company = this.companyData[this.currentCompany];
        const initialDate = this.getInitialDate();
        const currentCycle = this.monthDiff();
        
        $('#companyInfo').html(`
            <strong>${company.header}</strong> - Rate: $${company.rate}/hr<br>
            Started: ${initialDate.toLocaleDateString()} | Current Cycle: ${currentCycle}
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
            const newCurrentCycle = this.monthDiff();
            this.cycleInput.attr('max', newCurrentCycle);
            
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
