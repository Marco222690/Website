// ============================================
// DONATION MODAL FUNCTIONALITY
// ============================================

function initDonationModal() {
    const btnDonate = document.getElementById('btnDonate');
    const btnCloseModal = document.getElementById('btnCloseModal');
    const donationModal = document.getElementById('donationModal');
    const btnCopyNumber = document.getElementById('btnCopyNumber');

    if (btnDonate) {
        btnDonate.addEventListener('click', () => {
            donationModal.classList.remove('hidden');
        });
    }

    if (btnCloseModal) {
        btnCloseModal.addEventListener('click', () => {
            donationModal.classList.add('hidden');
        });
    }

    // Close modal when clicking outside
    if (donationModal) {
        donationModal.addEventListener('click', (e) => {
            if (e.target === donationModal) {
                donationModal.classList.add('hidden');
            }
        });
    }

    // Copy GCash number
    if (btnCopyNumber) {
        btnCopyNumber.addEventListener('click', () => {
            const number = document.getElementById('gcashNumber').textContent;
            navigator.clipboard.writeText(number).then(() => {
                btnCopyNumber.textContent = '✓ Copied!';
                setTimeout(() => {
                    btnCopyNumber.textContent = 'Copy Number';
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy:', err);
                alert('Copy failed. Please copy manually: ' + number);
            });
        });
    }
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDonationModal);
} else {
    initDonationModal();
}
