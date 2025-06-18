(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function t(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(i){if(i.ep)return;i.ep=!0;const o=t(i);fetch(i.href,o)}})();class d{constructor(){this.fortuneLevels={zh:{90:"极佳运势",80:"上佳运势",70:"良好运势",60:"中等运势",50:"平淡运势",40:"欠佳运势",30:"困难运势",0:"挑战运势"},en:{90:"Excellent Fortune",80:"Very Good Fortune",70:"Good Fortune",60:"Moderate Fortune",50:"Average Fortune",40:"Below Average",30:"Challenging Fortune",0:"Difficult Fortune"}},this.zodiacSigns=["白羊座","金牛座","双子座","巨蟹座","狮子座","处女座","天秤座","天蝎座","射手座","摩羯座","水瓶座","双鱼座"],this.wuxingElements=["金","木","水","火","土"],this.iChingHexagrams=["乾","坤","屯","蒙","需","讼","师","比","小畜","履","泰","否","同人","大有","谦","豫","随","蛊","临","观"]}async generateDivination(e,t="zh"){const n=this.calculateBaseScore(e),i=this.getZodiacInfluence(),o=this.getWuxingBalance(),s=this.getIChingGuidance(),a=Math.min(100,Math.max(10,n+i+o+s));return{fortuneScore:Math.round(a),fortuneLevel:this.getFortuneLevel(a,t),prediction:this.generatePrediction(e,a,t),favorable:this.generateFavorable(a,t),unfavorable:this.generateUnfavorable(a,t),explanation:this.generateExplanation(e,a,t),recommendations:this.generateRecommendations(e,a,t)}}calculateBaseScore(e){const t=e.length,n=e.split(/\s+/).length,i=(e.match(/[？?]/g)||[]).length;let o=0;for(let r=0;r<e.length;r++)o+=e.charCodeAt(r);let a=o%60+20;return t>50&&(a+=5),i>0&&(a+=3),n<5&&(a-=5),Math.max(10,Math.min(80,a))}getZodiacInfluence(){const e=new Date,n=Math.floor((e-new Date(e.getFullYear(),0,0))/864e5)%12;return[8,-3,5,-2,10,-1,6,-4,7,-2,9,-1][n]}getWuxingBalance(){const e=new Date,t=(e.getHours()+e.getMinutes())%5;return[3,-2,5,-1,4][t]}getIChingGuidance(){const e=new Date,t=(e.getSeconds()+e.getMilliseconds())%20;return[8,-3,4,-2,6,-4,7,-1,5,-3,9,-2,6,-4,8,-1,5,-3,7,-2][t]}getFortuneLevel(e,t){const n=this.fortuneLevels[t];for(const i of Object.keys(n).sort((o,s)=>s-o))if(e>=parseInt(i))return n[i];return n[0]}generatePrediction(e,t,n){const i={zh:{high:["星象显示，您即将迎来人生的重要转机，把握当下机遇","紫微斗数显示贵人运强，将有重要人物助您一臂之力","易经卦象吉利，您的愿望将在不久的将来实现","五行相生，各方面运势都将得到提升"],medium:["当前处于变化期，需要耐心等待最佳时机","运势平稳发展，稳扎稳打将有所收获","需要主动出击，机会偏爱有准备的人","保持现状的同时，寻找新的突破点"],low:["目前遇到一些阻碍，但这是成长必经之路","需要调整策略，换个角度思考问题","暂时的困难是为了更好的未来做准备","静心修身，等待运势回转的时机"]},en:{high:["The stars align favorably, you are about to encounter a significant turning point in life","Zi Wei Dou Shu shows strong benefactor luck, important people will help you","I-Ching hexagrams are auspicious, your wishes will be fulfilled soon","Five elements are in harmony, all aspects of fortune will improve"],medium:["Currently in a transition period, patience is needed for the optimal timing","Fortune develops steadily, consistent efforts will yield results","Need to take initiative, opportunities favor the prepared","Maintain status quo while seeking new breakthrough points"],low:["Currently facing some obstacles, but this is a necessary path for growth","Need to adjust strategies and think from different perspectives","Temporary difficulties are preparation for a better future","Cultivate inner peace and wait for fortune to turn"]}};let o="medium";t>=75?o="high":t<=45&&(o="low");const s=i[n][o];return s[Math.floor(Math.random()*s.length)]}generateFavorable(e,t){const i={zh:["主动沟通交流","学习新技能","投资理财","健康运动","社交聚会","创意思考","规划未来","整理环境","阅读学习","冥想静心","旅行出行","结交新友","审视内心","制定目标","寻求建议","关爱家人"],en:["Proactive communication","Learning new skills","Investment planning","Health exercises","Social gatherings","Creative thinking","Future planning","Organizing environment","Reading and learning","Meditation","Travel","Making new friends","Self-reflection","Goal setting","Seeking advice","Family care"]}[t],o=e>70?5:e>50?4:3;return this.getRandomItems(i,o)}generateUnfavorable(e,t){const i={zh:["冲动决策","大额支出","情绪化行为","忽视健康","负面思考","拖延计划","争执冲突","熬夜晚睡","暴饮暴食","消极等待","盲目投资","忽视家人","抱怨他人","逃避现实","固执己见","过度焦虑"],en:["Impulsive decisions","Large expenditures","Emotional behavior","Neglecting health","Negative thinking","Procrastination","Conflicts and disputes","Late nights","Overeating","Passive waiting","Blind investment","Neglecting family","Complaining about others","Avoiding reality","Being stubborn","Excessive anxiety"]}[t],o=e<40?5:e<60?4:3;return this.getRandomItems(i,o)}generateExplanation(e,t,n){const i=n==="zh",o=new Date,s=this.zodiacSigns[o.getMonth()],a=this.wuxingElements[o.getDate()%5],r=this.iChingHexagrams[o.getHours()%20];return i?`根据您的问题分析，结合当前的天象运行规律，您目前处于${this.getFortuneLevel(t,n)}阶段。从紫微斗数角度看，${s}的能量对您有显著影响，五行中${a}元素较为活跃。易经${r}卦提示您需要${t>70?"把握机遇，积极行动":t>50?"保持耐心，稳步前进":"调整心态，等待时机"}。综合东西方占卜智慧，建议您在未来一段时间内特别关注机会与挑战的平衡，${t>60?"您的运势正在上升期，适合主动出击":"目前需要韬光养晦，为将来的机遇做好准备"}。`:`Based on your question analysis and current celestial patterns, you are in a ${this.getFortuneLevel(t,n)} phase. From a Zi Wei Dou Shu perspective, the energy of ${s} has significant influence on you, with the ${a} element being particularly active in the Five Elements. The I-Ching ${r} hexagram suggests you need to ${t>70?"seize opportunities and take proactive action":t>50?"maintain patience and progress steadily":"adjust your mindset and wait for the right timing"}. Combining Eastern and Western divination wisdom, it's recommended that you pay special attention to the balance between opportunities and challenges in the coming period. ${t>60?"Your fortune is in an ascending phase, suitable for taking initiative":"Currently, you need to keep a low profile and prepare for future opportunities"}.`}generateRecommendations(e,t,n){const i={zh:{high:["抓住当前的黄金机会，勇敢迈出重要一步","扩大社交圈，多与成功人士交流学习","投资自己的能力提升，为未来布局","保持积极心态，用行动证明自己的价值"],medium:["制定详细的行动计划，分步骤实现目标","多听取他人建议，但要结合自身实际情况","保持学习心态，不断充实自己的知识储备","培养耐心，好事需要时间沉淀"],low:["暂时放慢节奏，重新审视自己的方向","寻求专业人士的指导和帮助","加强身心健康管理，为翻身做好准备","保持信心，困难是成功路上的垫脚石"]},en:{high:["Seize the current golden opportunity and bravely take an important step","Expand your social circle and learn from successful people","Invest in improving your abilities and plan for the future","Maintain a positive attitude and prove your worth through actions"],medium:["Create detailed action plans and achieve goals step by step","Listen to others' advice but combine it with your actual situation","Maintain a learning mindset and continuously enrich your knowledge","Cultivate patience, good things need time to develop"],low:["Slow down temporarily and re-examine your direction","Seek guidance and help from professionals","Strengthen physical and mental health management, prepare for a comeback","Maintain confidence, difficulties are stepping stones to success"]}};let o="medium";return t>=75?o="high":t<=45&&(o="low"),i[n][o]}getRandomItems(e,t){return[...e].sort(()=>.5-Math.random()).slice(0,t)}}class c{constructor(){this.currentLang="zh",this.divinationEngine=new d,this.init()}init(){this.setupEventListeners(),this.setupLanguageToggle(),this.setupSmoothScrolling(),this.setupFAQ(),this.setupMobileMenu()}setupEventListeners(){document.getElementById("divinationForm").addEventListener("submit",i=>this.handleDivination(i)),document.getElementById("closeModal").addEventListener("click",()=>this.closeModal());const n=document.getElementById("resultModal");n.addEventListener("click",i=>{i.target===n&&this.closeModal()})}setupLanguageToggle(){document.getElementById("langToggle").addEventListener("click",()=>this.toggleLanguage())}setupSmoothScrolling(){document.querySelectorAll('a[href^="#"]').forEach(e=>{e.addEventListener("click",function(t){t.preventDefault();const n=document.querySelector(this.getAttribute("href"));n&&n.scrollIntoView({behavior:"smooth",block:"start"})})})}setupFAQ(){document.querySelectorAll(".faq-toggle").forEach(e=>{e.addEventListener("click",function(){const t=this.nextElementSibling,n=!t.classList.contains("hidden");document.querySelectorAll(".faq-content").forEach(i=>i.classList.add("hidden")),document.querySelectorAll(".faq-toggle span:last-child").forEach(i=>i.textContent="+"),n||(t.classList.remove("hidden"),this.querySelector("span:last-child").textContent="-")})})}setupMobileMenu(){const e=document.getElementById("mobileMenuToggle"),t=document.getElementById("mobileMenu");e.addEventListener("click",()=>{t.classList.toggle("hidden")}),t.querySelectorAll("a").forEach(n=>{n.addEventListener("click",()=>{t.classList.add("hidden")})})}toggleLanguage(){this.currentLang=this.currentLang==="zh"?"en":"zh",document.querySelectorAll(".lang-zh, .lang-en").forEach(n=>{n.classList.add("hidden")}),document.querySelectorAll(`.lang-${this.currentLang}`).forEach(n=>{n.classList.remove("hidden")}),document.documentElement.lang=this.currentLang;const e=document.getElementById("question"),t={zh:"请详细描述您的问题，我们将为您提供最准确的占卜结果...",en:"Please describe your question in detail, and we will provide you with the most accurate divination results..."};e.placeholder=t[this.currentLang]}async handleDivination(e){e.preventDefault();const t=document.getElementById("question").value.trim();if(!t){alert(this.currentLang==="zh"?"请输入您的问题":"Please enter your question");return}this.showLoadingModal();try{await this.delay(2e3+Math.random()*2e3);const n=await this.divinationEngine.generateDivination(t,this.currentLang);this.showResult(n)}catch(n){console.error("Divination error:",n),alert(this.currentLang==="zh"?"占卜过程中出现错误，请稍后重试":"An error occurred during divination, please try again later")}finally{this.hideLoadingModal()}}showLoadingModal(){document.getElementById("loadingModal").classList.remove("hidden"),document.body.style.overflow="hidden"}hideLoadingModal(){document.getElementById("loadingModal").classList.add("hidden"),document.body.style.overflow="auto"}showResult(e){const t=document.getElementById("resultContent"),n=this.currentLang==="zh";t.innerHTML=`
            <div class="text-center mb-8">
                <h2 class="text-3xl font-bold gradient-text mb-2">
                    ${n?"您的占卜结果":"Your Divination Result"}
                </h2>
                <div class="w-20 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto"></div>
            </div>

            <div class="grid md:grid-cols-2 gap-6 mb-8">
                <div class="bg-white/5 rounded-xl p-6">
                    <h3 class="text-xl font-semibold mb-4 text-blue-400">
                        ${n?"💫 占卜结果":"💫 Divination Result"}
                    </h3>
                    <p class="text-lg font-medium text-white/90">${e.prediction}</p>
                </div>

                <div class="bg-white/5 rounded-xl p-6">
                    <h3 class="text-xl font-semibold mb-4 text-purple-400">
                        ${n?"⭐ 运势评级":"⭐ Fortune Rating"}
                    </h3>
                    <div class="flex items-center space-x-4">
                        <div class="text-3xl font-bold gradient-text">${e.fortuneScore}/100</div>
                        <div class="flex-1">
                            <div class="w-full bg-white/20 rounded-full h-3">
                                <div class="bg-gradient-to-r from-blue-400 to-purple-400 h-3 rounded-full transition-all duration-1000" 
                                     style="width: ${e.fortuneScore}%"></div>
                            </div>
                            <p class="text-sm text-white/70 mt-1">${e.fortuneLevel}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="grid md:grid-cols-2 gap-6 mb-8">
                <div class="bg-white/5 rounded-xl p-6">
                    <h3 class="text-xl font-semibold mb-4 text-green-400">
                        ${n?"✅ 宜":"✅ Favorable"}
                    </h3>
                    <ul class="space-y-2">
                        ${e.favorable.map(i=>`<li class="flex items-start space-x-2">
                            <span class="text-green-400 mt-1">•</span>
                            <span class="text-white/80">${i}</span>
                        </li>`).join("")}
                    </ul>
                </div>

                <div class="bg-white/5 rounded-xl p-6">
                    <h3 class="text-xl font-semibold mb-4 text-red-400">
                        ${n?"❌ 忌":"❌ Unfavorable"}
                    </h3>
                    <ul class="space-y-2">
                        ${e.unfavorable.map(i=>`<li class="flex items-start space-x-2">
                            <span class="text-red-400 mt-1">•</span>
                            <span class="text-white/80">${i}</span>
                        </li>`).join("")}
                    </ul>
                </div>
            </div>

            <div class="bg-white/5 rounded-xl p-6 mb-6">
                <h3 class="text-xl font-semibold mb-4 text-gold-400">
                    ${n?"🔍 详细解释":"🔍 Detailed Explanation"}
                </h3>
                <p class="text-white/80 leading-relaxed">${e.explanation}</p>
            </div>

            <div class="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl p-6 border border-blue-500/20">
                <h3 class="text-xl font-semibold mb-4 text-blue-300">
                    ${n?"💡 行动建议":"💡 Action Recommendations"}
                </h3>
                <div class="space-y-3">
                    ${e.recommendations.map((i,o)=>`
                        <div class="flex items-start space-x-3">
                            <div class="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 mt-1">
                                ${o+1}
                            </div>
                            <p class="text-white/90">${i}</p>
                        </div>
                    `).join("")}
                </div>
            </div>
        `,document.getElementById("resultModal").classList.remove("hidden"),document.body.style.overflow="hidden"}closeModal(){document.getElementById("resultModal").classList.add("hidden"),document.body.style.overflow="auto"}delay(e){return new Promise(t=>setTimeout(t,e))}}document.addEventListener("DOMContentLoaded",()=>{new c});
