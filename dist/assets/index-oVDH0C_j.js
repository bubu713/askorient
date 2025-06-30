(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))e(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&e(o)}).observe(document,{childList:!0,subtree:!0});function n(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function e(i){if(i.ep)return;i.ep=!0;const s=n(i);fetch(i.href,s)}})();class d{constructor(){this.fortuneLevels={zh:{90:"极佳运势",80:"上佳运势",70:"良好运势",60:"中等运势",50:"平淡运势",40:"欠佳运势",30:"困难运势",0:"挑战运势"},en:{90:"Excellent Fortune",80:"Very Good Fortune",70:"Good Fortune",60:"Moderate Fortune",50:"Average Fortune",40:"Below Average",30:"Challenging Fortune",0:"Difficult Fortune"}},this.zodiacSigns=["白羊座","金牛座","双子座","巨蟹座","狮子座","处女座","天秤座","天蝎座","射手座","摩羯座","水瓶座","双鱼座"],this.wuxingElements=["金","木","水","火","土"],this.iChingHexagrams=["乾","坤","屯","蒙","需","讼","师","比","小畜","履","泰","否","同人","大有","谦","豫","随","蛊","临","观"]}async generateDivination(t,n="zh"){const e=this.calculateBaseScore(t),i=this.getZodiacInfluence(),s=this.getWuxingBalance(),o=this.getIChingGuidance(),a=Math.min(100,Math.max(10,e+i+s+o));return{fortuneScore:Math.round(a),fortuneLevel:this.getFortuneLevel(a,n),prediction:this.generatePrediction(t,a,n),favorable:this.generateFavorable(a,n),unfavorable:this.generateUnfavorable(a,n),explanation:this.generateExplanation(t,a,n),recommendations:this.generateRecommendations(t,a,n)}}calculateBaseScore(t){const n=t.length,e=t.split(/\s+/).length,i=(t.match(/[？?]/g)||[]).length;let s=0;for(let l=0;l<t.length;l++)s+=t.charCodeAt(l);let a=s%60+20;return n>50&&(a+=5),i>0&&(a+=3),e<5&&(a-=5),Math.max(10,Math.min(80,a))}getZodiacInfluence(){const t=new Date,e=Math.floor((t-new Date(t.getFullYear(),0,0))/864e5)%12;return[8,-3,5,-2,10,-1,6,-4,7,-2,9,-1][e]}getWuxingBalance(){const t=new Date,n=(t.getHours()+t.getMinutes())%5;return[3,-2,5,-1,4][n]}getIChingGuidance(){const t=new Date,n=(t.getSeconds()+t.getMilliseconds())%20;return[8,-3,4,-2,6,-4,7,-1,5,-3,9,-2,6,-4,8,-1,5,-3,7,-2][n]}getFortuneLevel(t,n){const e=this.fortuneLevels[n];for(const i of Object.keys(e).sort((s,o)=>o-s))if(t>=parseInt(i))return e[i];return e[0]}generatePrediction(t,n,e){const i={zh:{high:["星象显示，您即将迎来人生的重要转机，把握当下机遇","紫微斗数显示贵人运强，将有重要人物助您一臂之力","易经卦象吉利，您的愿望将在不久的将来实现","五行相生，各方面运势都将得到提升"],medium:["当前处于变化期，需要耐心等待最佳时机","运势平稳发展，稳扎稳打将有所收获","需要主动出击，机会偏爱有准备的人","保持现状的同时，寻找新的突破点"],low:["目前遇到一些阻碍，但这是成长必经之路","需要调整策略，换个角度思考问题","暂时的困难是为了更好的未来做准备","静心修身，等待运势回转的时机"]},en:{high:["The stars align favorably, you are about to encounter a significant turning point in life","Zi Wei Dou Shu shows strong benefactor luck, important people will help you","I-Ching hexagrams are auspicious, your wishes will be fulfilled soon","Five elements are in harmony, all aspects of fortune will improve"],medium:["Currently in a transition period, patience is needed for the optimal timing","Fortune develops steadily, consistent efforts will yield results","Need to take initiative, opportunities favor the prepared","Maintain status quo while seeking new breakthrough points"],low:["Currently facing some obstacles, but this is a necessary path for growth","Need to adjust strategies and think from different perspectives","Temporary difficulties are preparation for a better future","Cultivate inner peace and wait for fortune to turn"]}};let s="medium";n>=75?s="high":n<=45&&(s="low");const o=i[e][s];return o[Math.floor(Math.random()*o.length)]}generateFavorable(t,n){const i={zh:["主动沟通交流","学习新技能","投资理财","健康运动","社交聚会","创意思考","规划未来","整理环境","阅读学习","冥想静心","旅行出行","结交新友","审视内心","制定目标","寻求建议","关爱家人"],en:["Proactive communication","Learning new skills","Investment planning","Health exercises","Social gatherings","Creative thinking","Future planning","Organizing environment","Reading and learning","Meditation","Travel","Making new friends","Self-reflection","Goal setting","Seeking advice","Family care"]}[n],s=t>70?5:t>50?4:3;return this.getRandomItems(i,s)}generateUnfavorable(t,n){const i={zh:["冲动决策","大额支出","情绪化行为","忽视健康","负面思考","拖延计划","争执冲突","熬夜晚睡","暴饮暴食","消极等待","盲目投资","忽视家人","抱怨他人","逃避现实","固执己见","过度焦虑"],en:["Impulsive decisions","Large expenditures","Emotional behavior","Neglecting health","Negative thinking","Procrastination","Conflicts and disputes","Late nights","Overeating","Passive waiting","Blind investment","Neglecting family","Complaining about others","Avoiding reality","Being stubborn","Excessive anxiety"]}[n],s=t<40?5:t<60?4:3;return this.getRandomItems(i,s)}generateExplanation(t,n,e){const i=e==="zh",s=new Date,o=this.zodiacSigns[s.getMonth()],a=this.wuxingElements[s.getDate()%5],l=this.iChingHexagrams[s.getHours()%20];return i?`根据您的问题分析，结合当前的天象运行规律，您目前处于${this.getFortuneLevel(n,e)}阶段。从紫微斗数角度看，${o}的能量对您有显著影响，五行中${a}元素较为活跃。易经${l}卦提示您需要${n>70?"把握机遇，积极行动":n>50?"保持耐心，稳步前进":"调整心态，等待时机"}。综合东西方占卜智慧，建议您在未来一段时间内特别关注机会与挑战的平衡，${n>60?"您的运势正在上升期，适合主动出击":"目前需要韬光养晦，为将来的机遇做好准备"}。`:`Based on your question analysis and current celestial patterns, you are in a ${this.getFortuneLevel(n,e)} phase. From a Zi Wei Dou Shu perspective, the energy of ${o} has significant influence on you, with the ${a} element being particularly active in the Five Elements. The I-Ching ${l} hexagram suggests you need to ${n>70?"seize opportunities and take proactive action":n>50?"maintain patience and progress steadily":"adjust your mindset and wait for the right timing"}. Combining Eastern and Western divination wisdom, it's recommended that you pay special attention to the balance between opportunities and challenges in the coming period. ${n>60?"Your fortune is in an ascending phase, suitable for taking initiative":"Currently, you need to keep a low profile and prepare for future opportunities"}.`}generateRecommendations(t,n,e){const i={zh:{high:["抓住当前的黄金机会，勇敢迈出重要一步","扩大社交圈，多与成功人士交流学习","投资自己的能力提升，为未来布局","保持积极心态，用行动证明自己的价值"],medium:["制定详细的行动计划，分步骤实现目标","多听取他人建议，但要结合自身实际情况","保持学习心态，不断充实自己的知识储备","培养耐心，好事需要时间沉淀"],low:["暂时放慢节奏，重新审视自己的方向","寻求专业人士的指导和帮助","加强身心健康管理，为翻身做好准备","保持信心，困难是成功路上的垫脚石"]},en:{high:["Seize the current golden opportunity and bravely take an important step","Expand your social circle and learn from successful people","Invest in improving your abilities and plan for the future","Maintain a positive attitude and prove your worth through actions"],medium:["Create detailed action plans and achieve goals step by step","Listen to others' advice but combine it with your actual situation","Maintain a learning mindset and continuously enrich your knowledge","Cultivate patience, good things need time to develop"],low:["Slow down temporarily and re-examine your direction","Seek guidance and help from professionals","Strengthen physical and mental health management, prepare for a comeback","Maintain confidence, difficulties are stepping stones to success"]}};let s="medium";return n>=75?s="high":n<=45&&(s="low"),i[e][s]}getRandomItems(t,n){return[...t].sort(()=>.5-Math.random()).slice(0,n)}}class c{constructor(){this.currentLang="en",this.divinationEngine=new d,this.selectedPlan=null,this.init()}init(){this.setupEventListeners(),this.setupLanguageToggle(),this.setupSmoothScrolling(),this.setupFAQ(),this.setupMobileMenu(),this.setupPaymentButtons()}setupEventListeners(){document.getElementById("divinationForm").addEventListener("submit",o=>this.handleDivination(o)),document.getElementById("closeModal").addEventListener("click",()=>this.closeModal()),document.getElementById("closePaymentModal").addEventListener("click",()=>this.closePaymentModal());const i=document.getElementById("resultModal");i.addEventListener("click",o=>{o.target===i&&this.closeModal()});const s=document.getElementById("paymentModal");s.addEventListener("click",o=>{o.target===s&&this.closePaymentModal()})}setupPaymentButtons(){document.querySelectorAll(".payment-btn").forEach(n=>{n.addEventListener("click",e=>{const i=e.target.getAttribute("data-plan");this.showPaymentModal(i)})})}setupLanguageToggle(){document.getElementById("langToggle").addEventListener("click",()=>this.toggleLanguage())}setupSmoothScrolling(){document.querySelectorAll('a[href^="#"]').forEach(t=>{t.addEventListener("click",function(n){n.preventDefault();const e=document.querySelector(this.getAttribute("href"));e&&e.scrollIntoView({behavior:"smooth",block:"start"})})})}setupFAQ(){document.querySelectorAll(".faq-toggle").forEach(t=>{t.addEventListener("click",function(){const n=this.nextElementSibling,e=!n.classList.contains("hidden");document.querySelectorAll(".faq-content").forEach(i=>i.classList.add("hidden")),document.querySelectorAll(".faq-toggle span:last-child").forEach(i=>i.textContent="+"),e||(n.classList.remove("hidden"),this.querySelector("span:last-child").textContent="-")})})}setupMobileMenu(){const t=document.getElementById("mobileMenuToggle"),n=document.getElementById("mobileMenu");t.addEventListener("click",()=>{n.classList.toggle("hidden")}),n.querySelectorAll("a").forEach(e=>{e.addEventListener("click",()=>{n.classList.add("hidden")})})}toggleLanguage(){this.currentLang=this.currentLang==="en"?"zh":"en",document.querySelectorAll(".lang-zh, .lang-en").forEach(e=>{e.classList.add("hidden")}),document.querySelectorAll(`.lang-${this.currentLang}`).forEach(e=>{e.classList.remove("hidden")}),document.documentElement.lang=this.currentLang;const t=document.getElementById("question"),n={en:"Please describe your question in detail, and we will provide you with the most accurate divination results...",zh:"请详细描述您的问题，我们将为您提供最准确的占卜结果..."};t.placeholder=n[this.currentLang]}showPaymentModal(t){this.selectedPlan=t;const n=document.getElementById("paymentContent"),e=this.currentLang==="zh",s={basic:{name:{zh:"基础版",en:"Basic"},price:{zh:"¥19",en:"$2.99"},features:{zh:["基础占卜分析","运势评级","简要建议"],en:["Basic divination analysis","Fortune rating","Brief advice"]}},professional:{name:{zh:"专业版",en:"Professional"},price:{zh:"¥49",en:"$6.99"},features:{zh:["深度占卜分析","多维度运势解读","详细宜忌指导","未来行动建议"],en:["Deep divination analysis","Multi-dimensional fortune reading","Detailed do's and don'ts","Future action advice"]}},master:{name:{zh:"大师版",en:"Master"},price:{zh:"¥99",en:"$13.99"},features:{zh:["大师级占卜分析","全方位运势报告","个性化解决方案","长期运势趋势","24小时内回复"],en:["Master-level analysis","Comprehensive fortune report","Personalized solutions","Long-term fortune trends","24-hour response"]}}}[t];n.innerHTML=`
            <div class="bg-white/5 rounded-xl p-6 mb-6">
                <h3 class="text-xl font-semibold mb-4 gradient-text">
                    ${e?"订单详情":"Order Details"}
                </h3>
                <div class="flex justify-between items-center mb-4">
                    <span class="text-lg">${s.name[e?"zh":"en"]}</span>
                    <span class="text-2xl font-bold gradient-text">${s.price[e?"zh":"en"]}</span>
                </div>
                <div class="text-sm text-white/70">
                    <p class="mb-2">${e?"包含功能：":"Includes:"}</p>
                    <ul class="space-y-1">
                        ${s.features[e?"zh":"en"].map(o=>`<li class="flex items-center"><span class="text-green-400 mr-2">✓</span>${o}</li>`).join("")}
                    </ul>
                </div>
            </div>

            <div class="space-y-4">
                <h3 class="text-lg font-semibold mb-4">
                    ${e?"选择支付方式":"Choose Payment Method"}
                </h3>
                
                <!-- Chinese Payment Methods -->
                <div class="lang-zh ${e?"":"hidden"}">
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
                <div class="lang-en ${e?"hidden":""}">
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
                                    ${e?"卡号":"Card Number"}
                                </label>
                                <input type="text" class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="1234 5678 9012 3456">
                            </div>
                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <label class="block text-sm font-medium text-white/80 mb-2">
                                        ${e?"有效期":"Expiry Date"}
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
                                    ${e?"持卡人姓名":"Cardholder Name"}
                                </label>
                                <input type="text" class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="${e?"请输入持卡人姓名":"Enter cardholder name"}">
                            </div>
                        </div>

                        <div id="qrPaymentForm" class="hidden text-center">
                            <div class="w-48 h-48 mx-auto mb-4 bg-white rounded-xl flex items-center justify-center">
                                <div class="text-gray-800 text-sm">
                                    ${e?"二维码将在此显示":"QR Code will appear here"}
                                </div>
                            </div>
                            <p class="text-white/70 text-sm">
                                ${e?"请使用相应的App扫描二维码完成支付":"Please scan the QR code with the corresponding app to complete payment"}
                            </p>
                        </div>

                        <button id="confirmPayment" class="btn-primary w-full mt-6">
                            ${e?"确认支付":"Confirm Payment"} ${s.price[e?"zh":"en"]}
                        </button>
                    </div>
                </div>

                <div class="text-xs text-white/50 text-center mt-4">
                    <p>${e?"支付安全由SSL加密保护":"Payment secured by SSL encryption"}</p>
                    <p>${e?"支持7天无理由退款":"7-day money-back guarantee"}</p>
                </div>
            </div>
        `,this.setupPaymentMethods(),document.getElementById("paymentModal").classList.remove("hidden"),document.body.style.overflow="hidden"}setupPaymentMethods(){const t=document.querySelectorAll(".payment-method-btn"),n=document.getElementById("paymentForm"),e=document.getElementById("cardPaymentForm"),i=document.getElementById("qrPaymentForm"),s=document.getElementById("confirmPayment");t.forEach(o=>{o.addEventListener("click",()=>{t.forEach(l=>l.classList.remove("ring-2","ring-blue-500")),o.classList.add("ring-2","ring-blue-500");const a=o.getAttribute("data-method");n.classList.remove("hidden"),e.classList.add("hidden"),i.classList.add("hidden"),a==="card"||a==="paypal"?e.classList.remove("hidden"):i.classList.remove("hidden")})}),s.addEventListener("click",()=>{this.processPayment()})}processPayment(){const t=this.currentLang==="zh",n=document.getElementById("confirmPayment");n.innerHTML,n.innerHTML=`
            <div class="flex items-center justify-center space-x-2">
                <div class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>${t?"处理中...":"Processing..."}</span>
            </div>
        `,n.disabled=!0,setTimeout(()=>{this.closePaymentModal(),this.showPaymentSuccess()},2e3)}showPaymentSuccess(){const t=this.currentLang==="zh",n=document.createElement("div");n.className="fixed inset-0 z-50 flex items-center justify-center p-4",n.innerHTML=`
            <div class="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>
            <div class="bg-mystery-800 rounded-2xl p-8 max-w-md w-full relative z-10 text-center mystical-border" style="padding: 2px;">
                <div class="bg-mystery-800 rounded-2xl p-8">
                    <div class="w-16 h-16 mx-auto mb-4 bg-green-500 rounded-full flex items-center justify-center">
                        <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                    </div>
                    <h3 class="text-2xl font-bold gradient-text mb-4">
                        ${t?"支付成功！":"Payment Successful!"}
                    </h3>
                    <p class="text-white/80 mb-6">
                        ${t?"您的占卜服务已激活，现在可以开始占卜了。":"Your divination service has been activated. You can now start your divination."}
                    </p>
                    <button class="btn-primary w-full" onclick="this.closest('.fixed').remove(); document.body.style.overflow = 'auto'">
                        ${t?"开始占卜":"Start Divination"}
                    </button>
                </div>
            </div>
        `,document.body.appendChild(n),document.body.style.overflow="hidden"}async handleDivination(t){t.preventDefault();const n=document.getElementById("question").value.trim();if(!n){alert(this.currentLang==="zh"?"请输入您的问题":"Please enter your question");return}this.showLoadingModal();try{await this.delay(2e3+Math.random()*2e3);const e=await this.divinationEngine.generateDivination(n,this.currentLang);this.showResult(e)}catch(e){console.error("Divination error:",e),alert(this.currentLang==="zh"?"占卜过程中出现错误，请稍后重试":"An error occurred during divination, please try again later")}finally{this.hideLoadingModal()}}showLoadingModal(){document.getElementById("loadingModal").classList.remove("hidden"),document.body.style.overflow="hidden"}hideLoadingModal(){document.getElementById("loadingModal").classList.add("hidden"),document.body.style.overflow="auto"}showResult(t){const n=document.getElementById("resultContent"),e=this.currentLang==="zh";n.innerHTML=`
            <div class="text-center mb-8">
                <h2 class="text-3xl font-bold gradient-text mb-2">
                    ${e?"您的占卜结果":"Your Divination Result"}
                </h2>
                <div class="w-20 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto"></div>
            </div>

            <div class="grid md:grid-cols-2 gap-6 mb-8">
                <div class="bg-white/5 rounded-xl p-6">
                    <h3 class="text-xl font-semibold mb-4 text-blue-400">
                        ${e?"💫 占卜结果":"💫 Divination Result"}
                    </h3>
                    <p class="text-lg font-medium text-white/90">${t.prediction}</p>
                </div>

                <div class="bg-white/5 rounded-xl p-6">
                    <h3 class="text-xl font-semibold mb-4 text-purple-400">
                        ${e?"⭐ 运势评级":"⭐ Fortune Rating"}
                    </h3>
                    <div class="flex items-center space-x-4">
                        <div class="text-3xl font-bold gradient-text">${t.fortuneScore}/100</div>
                        <div class="flex-1">
                            <div class="w-full bg-white/20 rounded-full h-3">
                                <div class="bg-gradient-to-r from-blue-400 to-purple-400 h-3 rounded-full transition-all duration-1000" 
                                     style="width: ${t.fortuneScore}%"></div>
                            </div>
                            <p class="text-sm text-white/70 mt-1">${t.fortuneLevel}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="grid md:grid-cols-2 gap-6 mb-8">
                <div class="bg-white/5 rounded-xl p-6">
                    <h3 class="text-xl font-semibold mb-4 text-green-400">
                        ${e?"✅ 宜":"✅ Favorable"}
                    </h3>
                    <ul class="space-y-2">
                        ${t.favorable.map(i=>`<li class="flex items-start space-x-2">
                            <span class="text-green-400 mt-1">•</span>
                            <span class="text-white/80">${i}</span>
                        </li>`).join("")}
                    </ul>
                </div>

                <div class="bg-white/5 rounded-xl p-6">
                    <h3 class="text-xl font-semibold mb-4 text-red-400">
                        ${e?"❌ 忌":"❌ Unfavorable"}
                    </h3>
                    <ul class="space-y-2">
                        ${t.unfavorable.map(i=>`<li class="flex items-start space-x-2">
                            <span class="text-red-400 mt-1">•</span>
                            <span class="text-white/80">${i}</span>
                        </li>`).join("")}
                    </ul>
                </div>
            </div>

            <div class="bg-white/5 rounded-xl p-6 mb-6">
                <h3 class="text-xl font-semibold mb-4 text-gold-400">
                    ${e?"🔍 详细解释":"🔍 Detailed Explanation"}
                </h3>
                <p class="text-white/80 leading-relaxed">${t.explanation}</p>
            </div>

            <div class="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl p-6 border border-blue-500/20">
                <h3 class="text-xl font-semibold mb-4 text-blue-300">
                    ${e?"💡 行动建议":"💡 Action Recommendations"}
                </h3>
                <div class="space-y-3">
                    ${t.recommendations.map((i,s)=>`
                        <div class="flex items-start space-x-3">
                            <div class="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 mt-1">
                                ${s+1}
                            </div>
                            <p class="text-white/90">${i}</p>
                        </div>
                    `).join("")}
                </div>
            </div>
        `,document.getElementById("resultModal").classList.remove("hidden"),document.body.style.overflow="hidden"}closeModal(){document.getElementById("resultModal").classList.add("hidden"),document.body.style.overflow="auto"}closePaymentModal(){document.getElementById("paymentModal").classList.add("hidden"),document.body.style.overflow="auto"}delay(t){return new Promise(n=>setTimeout(n,t))}}document.addEventListener("DOMContentLoaded",()=>{new c});
