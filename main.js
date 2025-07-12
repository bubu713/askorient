import './style.css'
import { DivinationEngine } from './divination.js'
// 444 55 666
class CygnusApp {
    constructor() {
        this.currentLang = 'en'  // Changed default to English
        this.divinationEngine = new DivinationEngine()
        this.selectedPlan = null
        this.init()
    }

    init() {
        this.setupEventListeners()
        this.setupLanguageToggle()
        this.setupSmoothScrolling()
        this.setupFAQ()
        this.setupMobileMenu()
        this.setupPaymentButtons()
    }

    setupEventListeners() {
        // Divination form
        const form = document.getElementById('divinationForm')
        form.addEventListener('submit', (e) => this.handleDivination(e))

        // Modal close
        const closeModal = document.getElementById('closeModal')
        closeModal.addEventListener('click', () => this.closeModal())

        const closePaymentModal = document.getElementById('closePaymentModal')
        closePaymentModal.addEventListener('click', () => this.closePaymentModal())

        // Close modal on backdrop click
        const resultModal = document.getElementById('resultModal')
        resultModal.addEventListener('click', (e) => {
            if (e.target === resultModal) {
                this.closeModal()
            }
        })

        const paymentModal = document.getElementById('paymentModal')
        paymentModal.addEventListener('click', (e) => {
            if (e.target === paymentModal) {
                this.closePaymentModal()
            }
        })
    }

    setupPaymentButtons() {
        const paymentButtons = document.querySelectorAll('.payment-btn')
        paymentButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const plan = e.target.getAttribute('data-plan')
                this.showPaymentModal(plan)
            })
        })
    }

    setupLanguageToggle() {
        const langToggle = document.getElementById('langToggle')
        langToggle.addEventListener('click', () => this.toggleLanguage())
    }

    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault()
                const target = document.querySelector(this.getAttribute('href'))
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    })
                }
            })
        })
    }

    setupFAQ() {
        document.querySelectorAll('.faq-toggle').forEach(toggle => {
            toggle.addEventListener('click', function() {
                const content = this.nextElementSibling
                const isOpen = !content.classList.contains('hidden')
                
                // Close all other FAQs
                document.querySelectorAll('.faq-content').forEach(c => c.classList.add('hidden'))
                document.querySelectorAll('.faq-toggle span:last-child').forEach(s => s.textContent = '+')
                
                if (!isOpen) {
                    content.classList.remove('hidden')
                    this.querySelector('span:last-child').textContent = '-'
                }
            })
        })
    }

    setupMobileMenu() {
        const mobileMenuToggle = document.getElementById('mobileMenuToggle')
        const mobileMenu = document.getElementById('mobileMenu')
        
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden')
        })

        // Close mobile menu when clicking on a link
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden')
            })
        })
    }

    toggleLanguage() {
        this.currentLang = this.currentLang === 'en' ? 'zh' : 'en'  // Swapped order
        
        // Hide all language elements
        document.querySelectorAll('.lang-zh, .lang-en').forEach(el => {
            el.classList.add('hidden')
        })
        
        // Show current language elements
        document.querySelectorAll(`.lang-${this.currentLang}`).forEach(el => {
            el.classList.remove('hidden')
        })

        // Update HTML lang attribute
        document.documentElement.lang = this.currentLang
        
        // Update placeholder text
        const questionTextarea = document.getElementById('question')
        const placeholders = {
            en: 'Please describe your question in detail, and we will provide you with the most accurate divination results...',
            zh: '请详细描述您的问题，我们将为您提供最准确的占卜结果...'
        }
        questionTextarea.placeholder = placeholders[this.currentLang]
    }

    showPaymentModal(plan) {
        this.selectedPlan = plan
        const paymentContent = document.getElementById('paymentContent')
        const isZh = this.currentLang === 'zh'
        
        const planDetails = {
            basic: {
                name: { zh: '基础版', en: 'Basic' },
                price: { zh: '¥19', en: '$2.99' },
                features: {
                    zh: ['基础占卜分析', '运势评级', '简要建议'],
                    en: ['Basic divination analysis', 'Fortune rating', 'Brief advice']
                }
            },
            professional: {
                name: { zh: '专业版', en: 'Professional' },
                price: { zh: '¥49', en: '$6.99' },
                features: {
                    zh: ['深度占卜分析', '多维度运势解读', '详细宜忌指导', '未来行动建议'],
                    en: ['Deep divination analysis', 'Multi-dimensional fortune reading', 'Detailed do\'s and don\'ts', 'Future action advice']
                }
            },
            master: {
                name: { zh: '大师版', en: 'Master' },
                price: { zh: '¥99', en: '$13.99' },
                features: {
                    zh: ['大师级占卜分析', '全方位运势报告', '个性化解决方案', '长期运势趋势', '24小时内回复'],
                    en: ['Master-level analysis', 'Comprehensive fortune report', 'Personalized solutions', 'Long-term fortune trends', '24-hour response']
                }
            }
        }

        const selectedPlan = planDetails[plan]
        
        paymentContent.innerHTML = `
            <div class="bg-white/5 rounded-xl p-6 mb-6">
                <h3 class="text-xl font-semibold mb-4 gradient-text">
                    ${isZh ? '订单详情' : 'Order Details'}
                </h3>
                <div class="flex justify-between items-center mb-4">
                    <span class="text-lg">${selectedPlan.name[isZh ? 'zh' : 'en']}</span>
                    <span class="text-2xl font-bold gradient-text">${selectedPlan.price[isZh ? 'zh' : 'en']}</span>
                </div>
                <div class="text-sm text-white/70">
                    <p class="mb-2">${isZh ? '包含功能：' : 'Includes:'}</p>
                    <ul class="space-y-1">
                        ${selectedPlan.features[isZh ? 'zh' : 'en'].map(feature => 
                            `<li class="flex items-center"><span class="text-green-400 mr-2">✓</span>${feature}</li>`
                        ).join('')}
                    </ul>
                </div>
            </div>

            <div class="space-y-4">
                <h3 class="text-lg font-semibold mb-4">
                    ${isZh ? '选择支付方式' : 'Choose Payment Method'}
                </h3>
                
                <!-- Chinese Payment Methods -->
                <div class="lang-zh ${isZh ? '' : 'hidden'}">
                    <div class="grid grid-cols-2 gap-4 mb-4">
                        <button class="payment-method-btn bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl p-4 transition-all duration-300" data-method="alipay">
                            <div class="flex items-center space-x-3">
                                <div class="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                                    <span class="text-white text-xs font-bold">支</span>
                                </div>
                                <span>支付宝</span>
                            </div>
                        </button>
                        
                        <button class="payment-method-btn bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl p-4 transition-all duration-300" data-method="wechat">
                            <div class="flex items-center space-x-3">
                                <div class="w-8 h-8 bg-green-500 rounded flex items-center justify-center">
                                    <span class="text-white text-xs font-bold">微</span>
                                </div>
                                <span>微信支付</span>
                            </div>
                        </button>
                    </div>
                    
                    <button class="payment-method-btn bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl p-4 w-full mb-4 transition-all duration-300" data-method="unionpay">
                        <div class="flex items-center space-x-3">
                            <div class="w-8 h-8 bg-red-500 rounded flex items-center justify-center">
                                <span class="text-white text-xs font-bold">银</span>
                            </div>
                            <span>银联支付</span>
                        </div>
                    </button>
                </div>

                <!-- International Payment Methods -->
                <div class="lang-en ${!isZh ? '' : 'hidden'}">
                    <div class="grid grid-cols-1 gap-4 mb-4">
                        <button class="payment-method-btn bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl p-4 transition-all duration-300" data-method="card">
                            <div class="flex items-center space-x-3">
                                <div class="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                                    <span class="text-white text-xs font-bold">💳</span>
                                </div>
                                <span>Credit/Debit Card</span>
                            </div>
                        </button>
                        
                        <button class="payment-method-btn bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl p-4 transition-all duration-300" data-method="paypal">
                            <div class="flex items-center space-x-3">
                                <div class="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                                    <span class="text-white text-xs font-bold">P</span>
                                </div>
                                <span>PayPal</span>
                            </div>
                        </button>
                    </div>
                </div>

                <!-- Payment Form -->
                <div id="paymentForm" class="hidden">
                    <div class="bg-white/5 rounded-xl p-6">
                        <div id="cardPaymentForm" class="hidden space-y-4">
                            <div>
                                <label class="block text-sm font-medium text-white/80 mb-2">
                                    ${isZh ? '卡号' : 'Card Number'}
                                </label>
                                <input type="text" class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="1234 5678 9012 3456">
                            </div>
                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <label class="block text-sm font-medium text-white/80 mb-2">
                                        ${isZh ? '有效期' : 'Expiry Date'}
                                    </label>
                                    <input type="text" class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="MM/YY">
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-white/80 mb-2">CVV</label>
                                    <input type="text" class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="123">
                                </div>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-white/80 mb-2">
                                    ${isZh ? '持卡人姓名' : 'Cardholder Name'}
                                </label>
                                <input type="text" class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="${isZh ? '请输入持卡人姓名' : 'Enter cardholder name'}">
                            </div>
                        </div>

                        <div id="qrPaymentForm" class="hidden text-center">
                            <div class="w-48 h-48 mx-auto mb-4 bg-white rounded-xl flex items-center justify-center">
                                <div class="text-gray-800 text-sm">
                                    ${isZh ? '二维码将在此显示' : 'QR Code will appear here'}
                                </div>
                            </div>
                            <p class="text-white/70 text-sm">
                                ${isZh ? '请使用相应的App扫描二维码完成支付' : 'Please scan the QR code with the corresponding app to complete payment'}
                            </p>
                        </div>

                        <button id="confirmPayment" class="btn-primary w-full mt-6">
                            ${isZh ? '确认支付' : 'Confirm Payment'} ${selectedPlan.price[isZh ? 'zh' : 'en']}
                        </button>
                    </div>
                </div>

                <div class="text-xs text-white/50 text-center mt-4">
                    <p>${isZh ? '支付安全由SSL加密保护' : 'Payment secured by SSL encryption'}</p>
                    <p>${isZh ? '支持7天无理由退款' : '7-day money-back guarantee'}</p>
                </div>
            </div>
        `

        // Setup payment method selection
        this.setupPaymentMethods()
        
        document.getElementById('paymentModal').classList.remove('hidden')
        document.body.style.overflow = 'hidden'
    }

    setupPaymentMethods() {
        const paymentMethodBtns = document.querySelectorAll('.payment-method-btn')
        const paymentForm = document.getElementById('paymentForm')
        const cardPaymentForm = document.getElementById('cardPaymentForm')
        const qrPaymentForm = document.getElementById('qrPaymentForm')
        const confirmPayment = document.getElementById('confirmPayment')

        paymentMethodBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active state from all buttons
                paymentMethodBtns.forEach(b => b.classList.remove('ring-2', 'ring-blue-500'))
                
                // Add active state to clicked button
                btn.classList.add('ring-2', 'ring-blue-500')
                
                const method = btn.getAttribute('data-method')
                paymentForm.classList.remove('hidden')
                
                // Hide all payment forms
                cardPaymentForm.classList.add('hidden')
                qrPaymentForm.classList.add('hidden')
                
                // Show appropriate payment form
                if (method === 'card' || method === 'paypal') {
                    cardPaymentForm.classList.remove('hidden')
                } else {
                    qrPaymentForm.classList.remove('hidden')
                }
            })
        })

        confirmPayment.addEventListener('click', () => {
            this.processPayment()
        })
    }

    processPayment() {
        const isZh = this.currentLang === 'zh'
        
        // Show loading state
        const confirmBtn = document.getElementById('confirmPayment')
        const originalText = confirmBtn.innerHTML
        confirmBtn.innerHTML = `
            <div class="flex items-center justify-center space-x-2">
                <div class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>${isZh ? '处理中...' : 'Processing...'}</span>
            </div>
        `
        confirmBtn.disabled = true

        // Simulate payment processing
        setTimeout(() => {
            this.closePaymentModal()
            this.showPaymentSuccess()
        }, 2000)
    }

    showPaymentSuccess() {
        const isZh = this.currentLang === 'zh'
        
        // Create success modal
        const successModal = document.createElement('div')
        successModal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4'
        successModal.innerHTML = `
            <div class="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>
            <div class="bg-mystery-800 rounded-2xl p-8 max-w-md w-full relative z-10 text-center mystical-border" style="padding: 2px;">
                <div class="bg-mystery-800 rounded-2xl p-8">
                    <div class="w-16 h-16 mx-auto mb-4 bg-green-500 rounded-full flex items-center justify-center">
                        <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                    </div>
                    <h3 class="text-2xl font-bold gradient-text mb-4">
                        ${isZh ? '支付成功！' : 'Payment Successful!'}
                    </h3>
                    <p class="text-white/80 mb-6">
                        ${isZh ? '您的占卜服务已激活，现在可以开始占卜了。' : 'Your divination service has been activated. You can now start your divination.'}
                    </p>
                    <button class="btn-primary w-full" onclick="this.closest('.fixed').remove(); document.body.style.overflow = 'auto'">
                        ${isZh ? '开始占卜' : 'Start Divination'}
                    </button>
                </div>
            </div>
        `
        
        document.body.appendChild(successModal)
        document.body.style.overflow = 'hidden'
    }

    async handleDivination(e) {
        e.preventDefault()
        
        const question = document.getElementById('question').value.trim()
        if (!question) {
            alert(this.currentLang === 'zh' ? '请输入您的问题' : 'Please enter your question')
            return
        }

        this.showLoadingModal()
        
        try {
            // Simulate processing time for better UX
            await this.delay(2000 + Math.random() * 2000)
            
            const result = await this.divinationEngine.generateDivination(question, this.currentLang)
            this.showResult(result)
        } catch (error) {
            console.error('Divination error:', error)
            alert(this.currentLang === 'zh' ? '占卜过程中出现错误，请稍后重试' : 'An error occurred during divination, please try again later')
        } finally {
            this.hideLoadingModal()
        }
    }

    showLoadingModal() {
        document.getElementById('loadingModal').classList.remove('hidden')
        document.body.style.overflow = 'hidden'
    }

    hideLoadingModal() {
        document.getElementById('loadingModal').classList.add('hidden')
        document.body.style.overflow = 'auto'
    }

    showResult(result) {
        const resultContent = document.getElementById('resultContent')
        
        const isZh = this.currentLang === 'zh'
        
        resultContent.innerHTML = `
            <div class="text-center mb-8">
                <h2 class="text-3xl font-bold gradient-text mb-2">
                    ${isZh ? '您的占卜结果' : 'Your Divination Result'}
                </h2>
                <div class="w-20 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto"></div>
            </div>

            <div class="grid md:grid-cols-2 gap-6 mb-8">
                <div class="bg-white/5 rounded-xl p-6">
                    <h3 class="text-xl font-semibold mb-4 text-blue-400">
                        ${isZh ? '💫 占卜结果' : '💫 Divination Result'}
                    </h3>
                    <p class="text-lg font-medium text-white/90">${result.prediction}</p>
                </div>

                <div class="bg-white/5 rounded-xl p-6">
                    <h3 class="text-xl font-semibold mb-4 text-purple-400">
                        ${isZh ? '⭐ 运势评级' : '⭐ Fortune Rating'}
                    </h3>
                    <div class="flex items-center space-x-4">
                        <div class="text-3xl font-bold gradient-text">${result.fortuneScore}/100</div>
                        <div class="flex-1">
                            <div class="w-full bg-white/20 rounded-full h-3">
                                <div class="bg-gradient-to-r from-blue-400 to-purple-400 h-3 rounded-full transition-all duration-1000" 
                                     style="width: ${result.fortuneScore}%"></div>
                            </div>
                            <p class="text-sm text-white/70 mt-1">${result.fortuneLevel}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="grid md:grid-cols-2 gap-6 mb-8">
                <div class="bg-white/5 rounded-xl p-6">
                    <h3 class="text-xl font-semibold mb-4 text-green-400">
                        ${isZh ? '✅ 宜' : '✅ Favorable'}
                    </h3>
                    <ul class="space-y-2">
                        ${result.favorable.map(item => `<li class="flex items-start space-x-2">
                            <span class="text-green-400 mt-1">•</span>
                            <span class="text-white/80">${item}</span>
                        </li>`).join('')}
                    </ul>
                </div>

                <div class="bg-white/5 rounded-xl p-6">
                    <h3 class="text-xl font-semibold mb-4 text-red-400">
                        ${isZh ? '❌ 忌' : '❌ Unfavorable'}
                    </h3>
                    <ul class="space-y-2">
                        ${result.unfavorable.map(item => `<li class="flex items-start space-x-2">
                            <span class="text-red-400 mt-1">•</span>
                            <span class="text-white/80">${item}</span>
                        </li>`).join('')}
                    </ul>
                </div>
            </div>

            <div class="bg-white/5 rounded-xl p-6 mb-6">
                <h3 class="text-xl font-semibold mb-4 text-gold-400">
                    ${isZh ? '🔍 详细解释' : '🔍 Detailed Explanation'}
                </h3>
                <p class="text-white/80 leading-relaxed">${result.explanation}</p>
            </div>

            <div class="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl p-6 border border-blue-500/20">
                <h3 class="text-xl font-semibold mb-4 text-blue-300">
                    ${isZh ? '💡 行动建议' : '💡 Action Recommendations'}
                </h3>
                <div class="space-y-3">
                    ${result.recommendations.map((rec, index) => `
                        <div class="flex items-start space-x-3">
                            <div class="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 mt-1">
                                ${index + 1}
                            </div>
                            <p class="text-white/90">${rec}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        `
        
        document.getElementById('resultModal').classList.remove('hidden')
        document.body.style.overflow = 'hidden'
    }

    closeModal() {
        document.getElementById('resultModal').classList.add('hidden')
        document.body.style.overflow = 'auto'
    }

    closePaymentModal() {
        document.getElementById('paymentModal').classList.add('hidden')
        document.body.style.overflow = 'auto'
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms))
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CygnusApp()
})