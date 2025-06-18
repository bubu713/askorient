import './style.css'
import { DivinationEngine } from './divination.js'

class CygnusApp {
    constructor() {
        this.currentLang = 'zh'
        this.divinationEngine = new DivinationEngine()
        this.init()
    }

    init() {
        this.setupEventListeners()
        this.setupLanguageToggle()
        this.setupSmoothScrolling()
        this.setupFAQ()
        this.setupMobileMenu()
    }

    setupEventListeners() {
        // Divination form
        const form = document.getElementById('divinationForm')
        form.addEventListener('submit', (e) => this.handleDivination(e))

        // Modal close
        const closeModal = document.getElementById('closeModal')
        closeModal.addEventListener('click', () => this.closeModal())

        // Close modal on backdrop click
        const resultModal = document.getElementById('resultModal')
        resultModal.addEventListener('click', (e) => {
            if (e.target === resultModal) {
                this.closeModal()
            }
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
        this.currentLang = this.currentLang === 'zh' ? 'en' : 'zh'
        
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
            zh: '请详细描述您的问题，我们将为您提供最准确的占卜结果...',
            en: 'Please describe your question in detail, and we will provide you with the most accurate divination results...'
        }
        questionTextarea.placeholder = placeholders[this.currentLang]
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

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms))
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CygnusApp()
})