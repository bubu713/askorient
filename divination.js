export class DivinationEngine {
    constructor() {
        this.fortuneLevels = {
            zh: {
                90: '极佳运势', 80: '上佳运势', 70: '良好运势', 
                60: '中等运势', 50: '平淡运势', 40: '欠佳运势', 
                30: '困难运势', 0: '挑战运势'
            },
            en: {
                90: 'Excellent Fortune', 80: 'Very Good Fortune', 70: 'Good Fortune',
                60: 'Moderate Fortune', 50: 'Average Fortune', 40: 'Below Average',
                30: 'Challenging Fortune', 0: 'Difficult Fortune'
            }
        }

        this.zodiacSigns = [
            '白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座',
            '天秤座', '天蝎座', '射手座', '摩羯座', '水瓶座', '双鱼座'
        ]

        this.wuxingElements = ['金', '木', '水', '火', '土']
        
        this.iChingHexagrams = [
            '乾', '坤', '屯', '蒙', '需', '讼', '师', '比', '小畜', '履',
            '泰', '否', '同人', '大有', '谦', '豫', '随', '蛊', '临', '观'
        ]
    }

    async generateDivination(question, language = 'zh') {
        const isZh = language === 'zh'
        
        // Generate base divination data
        const baseScore = this.calculateBaseScore(question)
        const zodiacInfluence = this.getZodiacInfluence()
        const wuxingBalance = this.getWuxingBalance()
        const iChingGuidance = this.getIChingGuidance()
        
        // Calculate final fortune score
        const fortuneScore = Math.min(100, Math.max(10, 
            baseScore + zodiacInfluence + wuxingBalance + iChingGuidance
        ))

        const result = {
            fortuneScore: Math.round(fortuneScore),
            fortuneLevel: this.getFortuneLevel(fortuneScore, language),
            prediction: this.generatePrediction(question, fortuneScore, language),
            favorable: this.generateFavorable(fortuneScore, language),
            unfavorable: this.generateUnfavorable(fortuneScore, language),
            explanation: this.generateExplanation(question, fortuneScore, language),
            recommendations: this.generateRecommendations(question, fortuneScore, language)
        }

        return result
    }

    calculateBaseScore(question) {
        const questionLength = question.length
        const wordCount = question.split(/\s+/).length
        const questionMarkCount = (question.match(/[？?]/g) || []).length
        
        // Base score calculation using numerology
        let score = 0
        for (let i = 0; i < question.length; i++) {
            score += question.charCodeAt(i)
        }
        
        // Normalize to 0-60 range
        const baseScore = (score % 60) + 20
        
        // Adjust based on question characteristics
        let adjustedScore = baseScore
        if (questionLength > 50) adjustedScore += 5 // Detailed questions get bonus
        if (questionMarkCount > 0) adjustedScore += 3 // Questions get bonus
        if (wordCount < 5) adjustedScore -= 5 // Too short questions penalty
        
        return Math.max(10, Math.min(80, adjustedScore))
    }

    getZodiacInfluence() {
        const now = new Date()
        const dayOfYear = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / 86400000)
        const zodiacIndex = dayOfYear % 12
        
        // Each zodiac sign has different influence patterns
        const influences = [8, -3, 5, -2, 10, -1, 6, -4, 7, -2, 9, -1]
        return influences[zodiacIndex]
    }

    getWuxingBalance() {
        const now = new Date()
        const elementIndex = (now.getHours() + now.getMinutes()) % 5
        
        // Wuxing element influences
        const balances = [3, -2, 5, -1, 4] // 金木水火土
        return balances[elementIndex]
    }

    getIChingGuidance() {
        const now = new Date()
        const hexagramIndex = (now.getSeconds() + now.getMilliseconds()) % 20
        
        // I-Ching hexagram influences
        const guidances = [
            8, -3, 4, -2, 6, -4, 7, -1, 5, -3,
            9, -2, 6, -4, 8, -1, 5, -3, 7, -2
        ]
        return guidances[hexagramIndex]
    }

    getFortuneLevel(score, language) {
        const levels = this.fortuneLevels[language]
        
        for (const threshold of Object.keys(levels).sort((a, b) => b - a)) {
            if (score >= parseInt(threshold)) {
                return levels[threshold]
            }
        }
        return levels[0]
    }

    generatePrediction(question, score, language) {
        const isZh = language === 'zh'
        
        const predictions = {
            zh: {
                high: [
                    '星象显示，您即将迎来人生的重要转机，把握当下机遇',
                    '紫微斗数显示贵人运强，将有重要人物助您一臂之力',
                    '易经卦象吉利，您的愿望将在不久的将来实现',
                    '五行相生，各方面运势都将得到提升'
                ],
                medium: [
                    '当前处于变化期，需要耐心等待最佳时机',
                    '运势平稳发展，稳扎稳打将有所收获',
                    '需要主动出击，机会偏爱有准备的人',
                    '保持现状的同时，寻找新的突破点'
                ],
                low: [
                    '目前遇到一些阻碍，但这是成长必经之路',
                    '需要调整策略，换个角度思考问题',
                    '暂时的困难是为了更好的未来做准备',
                    '静心修身，等待运势回转的时机'
                ]
            },
            en: {
                high: [
                    'The stars align favorably, you are about to encounter a significant turning point in life',
                    'Zi Wei Dou Shu shows strong benefactor luck, important people will help you',
                    'I-Ching hexagrams are auspicious, your wishes will be fulfilled soon',
                    'Five elements are in harmony, all aspects of fortune will improve'
                ],
                medium: [
                    'Currently in a transition period, patience is needed for the optimal timing',
                    'Fortune develops steadily, consistent efforts will yield results',
                    'Need to take initiative, opportunities favor the prepared',
                    'Maintain status quo while seeking new breakthrough points'
                ],
                low: [
                    'Currently facing some obstacles, but this is a necessary path for growth',
                    'Need to adjust strategies and think from different perspectives',
                    'Temporary difficulties are preparation for a better future',
                    'Cultivate inner peace and wait for fortune to turn'
                ]
            }
        }
        
        let category = 'medium'
        if (score >= 75) category = 'high'
        else if (score <= 45) category = 'low'
        
        const categoryPredictions = predictions[language][category]
        return categoryPredictions[Math.floor(Math.random() * categoryPredictions.length)]
    }

    generateFavorable(score, language) {
        const isZh = language === 'zh'
        
        const favorableOptions = {
            zh: [
                '主动沟通交流', '学习新技能', '投资理财', '健康运动',
                '社交聚会', '创意思考', '规划未来', '整理环境',
                '阅读学习', '冥想静心', '旅行出行', '结交新友',
                '审视内心', '制定目标', '寻求建议', '关爱家人'
            ],
            en: [
                'Proactive communication', 'Learning new skills', 'Investment planning', 'Health exercises',
                'Social gatherings', 'Creative thinking', 'Future planning', 'Organizing environment',
                'Reading and learning', 'Meditation', 'Travel', 'Making new friends',
                'Self-reflection', 'Goal setting', 'Seeking advice', 'Family care'
            ]
        }
        
        const options = favorableOptions[language]
        const count = score > 70 ? 5 : score > 50 ? 4 : 3
        
        return this.getRandomItems(options, count)
    }

    generateUnfavorable(score, language) {
        const isZh = language === 'zh'
        
        const unfavorableOptions = {
            zh: [
                '冲动决策', '大额支出', '情绪化行为', '忽视健康',
                '负面思考', '拖延计划', '争执冲突', '熬夜晚睡',
                '暴饮暴食', '消极等待', '盲目投资', '忽视家人',
                '抱怨他人', '逃避现实', '固执己见', '过度焦虑'
            ],
            en: [
                'Impulsive decisions', 'Large expenditures', 'Emotional behavior', 'Neglecting health',
                'Negative thinking', 'Procrastination', 'Conflicts and disputes', 'Late nights',
                'Overeating', 'Passive waiting', 'Blind investment', 'Neglecting family',
                'Complaining about others', 'Avoiding reality', 'Being stubborn', 'Excessive anxiety'
            ]
        }
        
        const options = unfavorableOptions[language]
        const count = score < 40 ? 5 : score < 60 ? 4 : 3
        
        return this.getRandomItems(options, count)
    }

    generateExplanation(question, score, language) {
        const isZh = language === 'zh'
        
        const now = new Date()
        const zodiacSign = this.zodiacSigns[now.getMonth()]
        const element = this.wuxingElements[now.getDate() % 5]
        const hexagram = this.iChingHexagrams[now.getHours() % 20]
        
        if (isZh) {
            return `根据您的问题分析，结合当前的天象运行规律，您目前处于${this.getFortuneLevel(score, language)}阶段。` +
                   `从紫微斗数角度看，${zodiacSign}的能量对您有显著影响，五行中${element}元素较为活跃。` +
                   `易经${hexagram}卦提示您需要${score > 70 ? '把握机遇，积极行动' : score > 50 ? '保持耐心，稳步前进' : '调整心态，等待时机'}。` +
                   `综合东西方占卜智慧，建议您在未来一段时间内特别关注机会与挑战的平衡，` +
                   `${score > 60 ? '您的运势正在上升期，适合主动出击' : '目前需要韬光养晦，为将来的机遇做好准备'}。`
        } else {
            return `Based on your question analysis and current celestial patterns, you are in a ${this.getFortuneLevel(score, language)} phase. ` +
                   `From a Zi Wei Dou Shu perspective, the energy of ${zodiacSign} has significant influence on you, with the ${element} element being particularly active in the Five Elements. ` +
                   `The I-Ching ${hexagram} hexagram suggests you need to ${score > 70 ? 'seize opportunities and take proactive action' : score > 50 ? 'maintain patience and progress steadily' : 'adjust your mindset and wait for the right timing'}. ` +
                   `Combining Eastern and Western divination wisdom, it's recommended that you pay special attention to the balance between opportunities and challenges in the coming period. ` +
                   `${score > 60 ? 'Your fortune is in an ascending phase, suitable for taking initiative' : 'Currently, you need to keep a low profile and prepare for future opportunities'}.`
        }
    }

    generateRecommendations(question, score, language) {
        const isZh = language === 'zh'
        
        const recommendations = {
            zh: {
                high: [
                    '抓住当前的黄金机会，勇敢迈出重要一步',
                    '扩大社交圈，多与成功人士交流学习',
                    '投资自己的能力提升，为未来布局',
                    '保持积极心态，用行动证明自己的价值'
                ],
                medium: [
                    '制定详细的行动计划，分步骤实现目标',
                    '多听取他人建议，但要结合自身实际情况',
                    '保持学习心态，不断充实自己的知识储备',
                    '培养耐心，好事需要时间沉淀'
                ],
                low: [
                    '暂时放慢节奏，重新审视自己的方向',
                    '寻求专业人士的指导和帮助',
                    '加强身心健康管理，为翻身做好准备',
                    '保持信心，困难是成功路上的垫脚石'
                ]
            },
            en: {
                high: [
                    'Seize the current golden opportunity and bravely take an important step',
                    'Expand your social circle and learn from successful people',
                    'Invest in improving your abilities and plan for the future',
                    'Maintain a positive attitude and prove your worth through actions'
                ],
                medium: [
                    'Create detailed action plans and achieve goals step by step',
                    'Listen to others\' advice but combine it with your actual situation',
                    'Maintain a learning mindset and continuously enrich your knowledge',
                    'Cultivate patience, good things need time to develop'
                ],
                low: [
                    'Slow down temporarily and re-examine your direction',
                    'Seek guidance and help from professionals',
                    'Strengthen physical and mental health management, prepare for a comeback',
                    'Maintain confidence, difficulties are stepping stones to success'
                ]
            }
        }
        
        let category = 'medium'
        if (score >= 75) category = 'high'
        else if (score <= 45) category = 'low'
        
        return recommendations[language][category]
    }

    getRandomItems(array, count) {
        const shuffled = [...array].sort(() => 0.5 - Math.random())
        return shuffled.slice(0, count)
    }
}