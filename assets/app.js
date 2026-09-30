/* ═══════════════════════════════════════════════════════════
   Nabd · نبض التميز — App Logic
   Shared by ar.html & en.html · Uses window.APP_LANG
   ═══════════════════════════════════════════════════════════ */
(function(){
'use strict';

const LANG = window.APP_LANG || 'ar';
const IS_AR = LANG === 'ar';
const $ = s => document.querySelector(s);
const $$ = s => Array.from(document.querySelectorAll(s));

/* ═══════════ 1. DOMAINS ═══════════ */
const DOMAINS = {
  emotional:{icon:'💗',color:'#E74C3C',grad:'linear-gradient(135deg,#E74C3C,#FF6B9D)',ar:'العاطفي',en:'Emotional'},
  cognitive:{icon:'🧠',color:'#7C3AED',grad:'linear-gradient(135deg,#7C3AED,#A78BFA)',ar:'العقلي',en:'Cognitive'},
  behavioral:{icon:'🎯',color:'#06D6A0',grad:'linear-gradient(135deg,#06D6A0,#4ECDC4)',ar:'السلوكي',en:'Behavioral'},
  skills:{icon:'🤝',color:'#FF6B9D',grad:'linear-gradient(135deg,#FF6B9D,#FFD166)',ar:'المهاري',en:'Skills'}
};

const SUBDOMAINS = {
  'emo-awareness':{domain:'emotional',icon:'💭',ar:'الوعي الانفعالي الذاتي',en:'Self-Emotional Awareness'},
  'emo-regulation':{domain:'emotional',icon:'🧘',ar:'التنظيم والضبط العاطفي',en:'Emotional Regulation'},
  'emo-empathy':{domain:'emotional',icon:'🤍',ar:'التعاطف والوعي الاجتماعي',en:'Empathy & Social Awareness'},
  'cog-memory':{domain:'cognitive',icon:'🧩',ar:'الذاكرة العاملة ومعالجة المعلومات',en:'Working Memory & Processing'},
  'cog-flex':{domain:'cognitive',icon:'🔄',ar:'المرونة المعرفية والتفكير التكيفي',en:'Cognitive Flexibility'},
  'cog-reason':{domain:'cognitive',icon:'🔍',ar:'التفكير المنطقي وأخذ المنظور',en:'Logical Reasoning & Perspective'},
  'beh-inhibit':{domain:'behavioral',icon:'✋',ar:'الضبط التثبيطي وكبح الاندفاع',en:'Inhibitory Control'},
  'beh-routine':{domain:'behavioral',icon:'📋',ar:'الالتزام بالروتين والتنظيم الذاتي',en:'Routine & Self-Regulation'},
  'skl-comm':{domain:'skills',icon:'💬',ar:'المهارات التواصلية التفاعلية',en:'Interactive Communication'},
  'skl-social':{domain:'skills',icon:'🤝',ar:'المهارات الاجتماعية والتفاوض',en:'Social Skills & Negotiation'}
};

/* ═══════════ 2. QUESTIONS (34) ═══════════ */
const QS = [
  {id:'BND-EMO-01',d:'emotional',s:'emo-awareness',ar:'يستخدم كلمات صريحة لتسمية انزعاجه بدلاً من الصراخ.',en:'Uses clear words to name their distress instead of screaming.'},
  {id:'BND-EMO-02',d:'emotional',s:'emo-awareness',ar:'يسمي خوفه أو حيرته بكلمات صريحة أثناء الألعاب والمواقف المفاجئة.',en:'Names their fear or confusion with clear words during play and sudden situations.'},
  {id:'BND-EMO-03',d:'emotional',s:'emo-awareness',ar:'يوضح السبب المباشر لشعوره بالضيق عندما يسأله أحد الأبوين.',en:'Explains the direct reason for their distress when asked by a parent.'},
  {id:'BND-EMO-05',d:'emotional',s:'emo-awareness',ar:'يصرح بشعوره بالإحباط عند تعثر أدائه في مهمة محددة.',en:'Expresses frustration when struggling with a specific task.'},
  {id:'BND-EMO-07',d:'emotional',s:'emo-regulation',ar:'يلجأ لأحد الأبوين لطلب التهدئة عند تعثر لعبته دون استمرار النوبة.',en:'Seeks a parent for calming when play gets hard without prolonged tantrum.'},
  {id:'BND-EMO-08',d:'emotional',s:'emo-regulation',ar:'يستجيب للتوجيه اللفظي أو الحضن لتهدئة غضبه خلال دقائق معدودة.',en:'Responds to verbal guidance or a hug to calm anger within minutes.'},
  {id:'BND-EMO-09',d:'emotional',s:'emo-regulation',ar:'يتوقف مؤقتاً ويبتعد عن موقف الانزعاج لتهدئة نفسه.',en:'Pauses briefly and steps away from the upsetting situation to self-calm.'},
  {id:'BND-EMO-11',d:'emotional',s:'emo-regulation',ar:'يستعيد توازنه العاطفي ويتجاوز شعور الخسارة في الألعاب التنافسية.',en:'Regains emotional balance and moves past losing in competitive games.'},
  {id:'BND-EMO-12',d:'emotional',s:'emo-empathy',ar:'يقدم لعبة أو لمسة حنونة لمواساة طفل آخر يبكي أمامه.',en:'Offers a toy or gentle touch to comfort a crying child.'},
  {id:'BND-EMO-13',d:'emotional',s:'emo-empathy',ar:'يسأل صديقه أو أخاه عما يضايقه فور رؤيته متألماً أو حزيناً.',en:'Asks a friend or sibling what bothers them upon seeing them upset.'},
  {id:'BND-EMO-15',d:'emotional',s:'emo-empathy',ar:'يخفض صوته ويحد من حركته تلقائياً عند علمه بمرض أو تعب أحد أفراد الأسرة.',en:'Lowers voice and movement automatically when a family member is sick or tired.'},
  {id:'BND-COG-01',d:'cognitive',s:'cog-memory',ar:'ينفذ تعليمات شفاهية متتابعة من خطوتين بترتيبها الصحيح دون نسيان.',en:'Follows two-step verbal instructions in the correct order without forgetting.'},
  {id:'BND-COG-02',d:'cognitive',s:'cog-memory',ar:'ينفذ توجيهات منزلية متتابعة من ثلاث خطوات دون حاجة لتكرار التوجيه.',en:'Executes three-step home instructions without needing repetition.'},
  {id:'BND-COG-03',d:'cognitive',s:'cog-memory',ar:'يتذكر القواعد الشفاهية للعبة الجماعية ويرددها قبل أداء النشاط.',en:'Recalls and repeats verbal rules of group games before starting.'},
  {id:'BND-COG-05',d:'cognitive',s:'cog-memory',ar:'يحتفظ بالخطوات الذهنية المتتابعة أثناء حل الواجبات أو تركيب الألعاب المركبة.',en:'Retains sequential mental steps while doing homework or complex play.'},
  {id:'BND-COG-07',d:'cognitive',s:'cog-flex',ar:'ينقل تصنيف الأشياء من معيار اللون إلى معيار الشكل فور توجيهه لتغيير القاعدة.',en:'Shifts sorting from color to shape as soon as the rule changes.'},
  {id:'BND-COG-09',d:'cognitive',s:'cog-flex',ar:'يتقبل تعديل موعد أو جدول الخروج دون تذمر يستمر لأكثر من بضع دقائق.',en:'Accepts a change in outing schedule without prolonged complaint.'},
  {id:'BND-COG-11',d:'cognitive',s:'cog-flex',ar:'يجرب طريقة تفكير جديدة لبناء أو تركيب لعبة فور فشل المحاولة الأولى.',en:'Tries a new approach when the first attempt to build or assemble fails.'},
  {id:'BND-COG-12',d:'cognitive',s:'cog-reason',ar:'يقدم تفسيراً واقعياً لسبب انسكاب الماء أو انكسار الغرض.',en:'Gives a realistic explanation for why water spilled or an object broke.'},
  {id:'BND-COG-13',d:'cognitive',s:'cog-reason',ar:'يميز بوضوح بين الأحداث الحقيقية والأحداث الخيالية في القصص.',en:'Clearly distinguishes real from imaginary events in stories.'},
  {id:'BND-COG-14',d:'cognitive',s:'cog-reason',ar:'يتوقع أن صديقه سيبحث عن اللعبة في مكانها القديم فور نقلها دون علمه.',en:'Expects a friend to look for the toy in its old place after it was moved.'},
  {id:'BND-COG-16',d:'cognitive',s:'cog-reason',ar:'يقدم سبباً منطقياً مستنداً إلى دليل عند الاختيار بين خيارين يوميين.',en:'Provides logical reasoning supported by evidence when choosing between options.'},
  {id:'BND-BEH-01',d:'behavioral',s:'beh-inhibit',ar:'ينتظر دوره الهادئ في اللعب الجماعي دون تدافع حركي.',en:'Waits their turn calmly in group play without pushing.'},
  {id:'BND-BEH-02',d:'behavioral',s:'beh-inhibit',ar:'ينتظر دوره في توزيع الوجبات بالبيت أو في الطابور دون تذمر.',en:'Waits their turn at meal distribution or queue without complaint.'},
  {id:'BND-BEH-03',d:'behavioral',s:'beh-inhibit',ar:'يتوقف عن الحركة والجري تماماً فور سماع إشارة التنبيه أو النهي.',en:'Stops moving and running completely upon hearing a stop signal.'},
  {id:'BND-BEH-06',d:'behavioral',s:'beh-routine',ar:'يرتدي حذاءه أو ملابسه بمفرده عند الاستعداد للخروج.',en:'Puts on shoes or clothes independently when preparing to go out.'},
  {id:'BND-BEH-07',d:'behavioral',s:'beh-routine',ar:'يبدأ بتنفيذ الخطوة الأولى من روتين العودة للبيت فور دخوله.',en:'Starts the first step of the return routine upon entering the home.'},
  {id:'BND-BEH-08',d:'behavioral',s:'beh-routine',ar:'يعيد ألعابه وأدواته المدرسية إلى مواضعها المخصصة فور الانتهاء منها.',en:'Returns toys and school tools to their places after use.'},
  {id:'BND-SKL-01',d:'skills',s:'skl-comm',ar:'يستخدم جملة صريحة وواضحة لطلب طعامه أو ألعابه.',en:'Uses a clear sentence to request food or toys.'},
  {id:'BND-SKL-02',d:'skills',s:'skl-comm',ar:'ينظر باتجاه المتحدث أثناء الحوار المباشر معه.',en:'Looks at the speaker during direct conversation.'},
  {id:'BND-SKL-03',d:'skills',s:'skl-comm',ar:'عندما يتلقى توجيهاً غير واضح، يستفسر بكلماته بدلاً من التنفيذ العشوائي أو التوقف.',en:'When a direction is unclear, asks for clarification instead of acting randomly or stopping.'},
  {id:'BND-SKL-06',d:'skills',s:'skl-social',ar:'يشارك أدواته وألعابه مع زملائه بالتناوب أثناء اللعب.',en:'Shares tools and toys with peers by taking turns.'},
  {id:'BND-SKL-07',d:'skills',s:'skl-social',ar:'يقترح حلاً وسطاً مرضياً عند الخلاف مع صديقه حول نوع اللعبة.',en:'Suggests a middle-ground solution when disagreeing with a friend about play.'},
  {id:'BND-SKL-08',d:'skills',s:'skl-social',ar:'يتعاون مع فريق من الأقران لإتمام مهمة أو مشروع مشترك بنجاح.',en:'Cooperates with a team to complete a shared task successfully.'}
];

/* ═══════════ 3. ACTIVITIES (30) ═══════════ */
const ACTS = {

/* ═══════════ 1. الوعي الانفعالي الذاتي ═══════════ */
'emo-awareness':[
  {ic:'📖',du:{ar:'10 د',en:'10 min'},fr:{ar:'3×أسبوعيًا',en:'3×/week'},ag:[3,5],
   sk:{ar:'تسمية المشاعر الأساسية',en:'Naming basic emotions'},
   nb:{ar:'صعوبة تعبير الطفل عن مشاعره بالكلمات واللجوء للصراخ',en:'Difficulty expressing feelings in words'},
   ta:'قاموس المشاعر اليومي',te:'Daily Emotions Dictionary',
   da:'بطاقات وجوه للمشاعر، يختار الطفل وجهه الحالي ويسميه بكلمة.',
   de:'Emotion face cards; child picks and names their current feeling.',
   ma:{ar:'5 بطاقات ورقية + أقلام تلوين',en:'5 paper cards + coloring pens'},
   st:{ar:[
     'ارسم 5 وجوه على البطاقات: 😊 فرح، 😢 حزن، 😠 غضب، 😨 خوف، 😐 عادي.',
     'ضع البطاقات أمام الطفل على الطاولة.',
     'اسأله: "كيف تشعر الآن؟ اختر وجهك."',
     'دعه يرفع البطاقة ويقول: "أنا ..."',
     'اربط الشعور بموقفه اليوم: "لماذا تشعر هكذا؟"',
     'اختم: "شعورك مهم، شكراً لمشاركتي."'
   ],en:[
     'Draw 5 faces: happy, sad, angry, afraid, neutral.',
     'Place cards in front of the child.',
     'Ask: "How do you feel now? Pick your face."',
     'Let them pick and say: "I am ..."',
     'Link to today: "Why do you feel this way?"',
     'Close: "Your feeling matters."'
   ]},
   pd:{ar:'انمذج أنت أولاً: "اليوم أنا سعيد لأن...". لا تصحح شعوره أبداً.',
       en:'Model first: "Today I am happy because...". Never correct the feeling.'},
   wa:'هل يستبدل الصراخ بالتسمية اللفظية؟',we:'Does he replace screaming with naming?',
   src:'CASEL Framework / NAP Parenting Matters'},

  {ic:'📚',du:{ar:'10 د',en:'10 min'},fr:{ar:'3×أسبوعيًا',en:'3×/week'},ag:[5,7],
   sk:{ar:'ربط الشعور بالسبب المباشر',en:'Linking feeling to cause'},
   nb:{ar:'عجز الطفل عن شرح سبب انزعاجه',en:'Inability to explain why upset'},
   ta:'قصة بطلي والموقف المفاجئ',te:'My Upset Hero Story',
   da:'قراءة قصة والتوقف عند شخصية منزعجة لربط السبب بالشعور.',
   de:'Read a story and pause at an upset character to link cause to feeling.',
   ma:{ar:'القصة المرفقة أدناه (اطبعها أو اقرأها من الشاشة)',en:'The story below (print or read from screen)'},
   story:{ar:`**قصة سامي والبرج المنهار**

كان سامي يبني برجاً عالياً من المكعبات. وضع مكعباً فوق مكعب، حتى صار البرج أطول من كرسيّه. وفجأة... انهار البرج! تناثرت المكعبات على الأرض.

شعر سامي بالحزن الشديد وقال: "لن أبني أبداً مرة أخرى!"

جلس على الأرض ووضع يديه على وجهه. جاءت أمه وقالت بهدوء: "سامي، أراك حزيناً. هل تشعر بالضيق لأن البرج انهار؟"

قال سامي: "نعم يا أمي، تعبت كثيراً وبنيته ثم انهار!"

قالت أمه: "أفهم شعورك. أنا أيضاً أحزن عندما يضيع تعبي. ما رأيك أن نستريح دقيقة، ثم نبني برجاً أقوى؟"

ابتسم سامي وقال: "نعم! سأبني برجاً لا ينهار هذه المرة!"`,

   en:`**Sami and the Falling Tower**

Sami was building a tall tower with blocks. One block on top of another, until the tower was taller than his chair. Suddenly... the tower fell! Blocks scattered everywhere.

Sami felt very sad and said: "I'll never build again!"

He sat on the floor and covered his face with his hands. His mother came and said calmly: "Sami, I see you're sad. Are you upset because the tower fell?"

Sami said: "Yes mom, I worked so hard and then it fell!"

His mother said: "I understand. I also feel sad when my work is lost. How about we rest a minute, then build a stronger tower?"

Sami smiled and said: "Yes! I'll build a tower that won't fall this time!"`},

   st:{ar:[
     'اقرأ القصة بصوت معبّر وحرّك يديك.',
     'عند جملة "شعر سامي بالحزن" توقف واسأل: "بماذا يشعر سامي الآن؟"',
     'استمر حتى نهاية القصة.',
     'بعد الانتهاء اسأل: "لماذا شعر سامي بالحزن؟"',
     'ثم: "كيف ساعدته أمه؟"',
     'اربط بالواقع: "هل حدث لك شيء مثل هذا؟"'
   ],en:[
     'Read expressively with hand motions.',
     'At "Sami felt sad" pause and ask: "How does Sami feel?"',
     'Continue to the end.',
     'After: "Why was Sami sad?"',
     'Then: "How did his mom help?"',
     'Connect: "Has this happened to you?"'
   ]},
   pd:{ar:'كن مستمعاً لا مُلقّناً. اسأل أسئلة مفتوحة ولا تصحح إجابة الطفل.',
       en:'Be a listener, not a lecturer. Ask open questions.'},
   wa:'هل يربط السبب بالنتيجة؟',we:'Does he link cause to feeling?',
   src:'NAP Dialogic Reading / CASEL'},

  {ic:'🌤️',du:{ar:'5 د',en:'5 min'},fr:{ar:'عند الحاجة',en:'As needed'},ag:[7,12],
   sk:{ar:'الوعي بالانفعالات المركبة',en:'Awareness of complex emotions'},
   nb:{ar:'اختزال الطفل لمشاعره في "غاضب" فقط',en:'Reducing all feelings to "angry"'},
   ta:'لوحة الطقس الداخلي',te:'Inner Weather Board',
   da:'تشبيه الحالة الداخلية بالطقس: مشمس/غائم/عاصف.',
   de:'Compare inner state to weather: sunny/cloudy/stormy.',
   ma:{ar:'ورقة + أقلام + ملصقات (أو رسم بسيط)',en:'Paper + pens + stickers'},
   st:{ar:[
     'ارسم 4 حالات جو: ☀️ مشمس = مرتاح، 🌤️ غائم = محبط، 🌧️ ممطر = حزين، ⛈️ عاصف = غاضب.',
     'بعد المدرسة أو نشاط تنافسي اسأل: "كيف حال طقسك الداخلي؟"',
     'لا تكتفِ بالإشارة، بل اطلب وصفاً: "لماذا الطقس عاصف؟"',
     'استخدم التعبير: "أنا محبط" بدلاً من "أنا غاضب".',
     'علق اللوحة في غرفته للرجوع إليها.'
   ],en:[
     'Draw 4 weather states: sunny, cloudy, rainy, stormy.',
     'After school or a challenge: "How is your inner weather?"',
     'Ask for description: "Why is it stormy?"',
     'Use: "I am frustrated" instead of "I am angry".',
     'Hang on bedroom wall for reference.'
   ]},
   pd:{ar:'شارك طقسك الداخلي أيضاً ليشعر الطفل بالأمان.',en:'Share your inner weather too.'},
   wa:'هل يستخدم مفردات دقيقة؟',we:'Does he use precise words?',
   src:'CASEL (Self-Awareness) Advanced'}
],

/* ═══════════ 2. التنظيم والضبط العاطفي ═══════════ */
'emo-regulation':[
  {ic:'🧘',du:{ar:'5-10 د',en:'5-10 min'},fr:{ar:'عند التوتر',en:'When stressed'},ag:[3,5],
   sk:{ar:'التهدئة الذاتية',en:'Self-calming'},
   nb:{ar:'استمرار نوبات الغضب والانغمار العاطفي',en:'Prolonged emotional flooding'},
   ta:'ركن التنفس والتهدئة',te:'Breathing Calm Corner',
   da:'مساحة هادئة بوسادة، يتنفس الطفل 3 أنفاس بطيئة.',
   de:'Calm space with a pillow; child takes 3 slow breaths.',
   ma:{ar:'وسادة + بطانية + صورة شمعة',en:'Pillow + blanket + candle picture'},
   st:{ar:[
     'جهّز ركناً هادئاً في غرفة الطفل.',
     'علّق صورة شمعة على الحائط.',
     'عند الغضب: "تعال نجلس هنا معاً دقيقة."',
     'قل: "خذ نفساً كأنك تنفخ الشمعة."',
     'كرر 3 أنفاس ببطء.',
     'بعدها: "الآن هادئان. لنكمل."'
   ],en:[
     'Set up a quiet corner.',
     'Hang a candle picture.',
     'When upset: "Let\'s sit here together."',
     'Say: "Breathe like blowing out a candle."',
     'Repeat 3 slow breaths.',
     'Then: "Now we\'re calm. Let\'s continue."'
   ]},
   pd:{ar:'لا تستخدم الركن كعقاب، بل كملاذ آمن يذهب إليه الطفل بمحض إرادته.',
       en:'Never use the corner as punishment — it\'s a safe haven.'},
   wa:'هل يقبل الابتعاد للتهدئة؟',we:'Does he accept stepping away?',
   src:'Harvard EF / WHO Guidelines'},

  {ic:'🤗',du:{ar:'3-5 د',en:'3-5 min'},fr:{ar:'عند الضيق',en:'When upset'},ag:[3,5],
   sk:{ar:'التهدئة المشتركة مع المربي',en:'Co-regulation with caregiver'},
   nb:{ar:'عدم قدرة الطفل على القبول بأي تدخل للتهدئة',en:'Rejecting all calming attempts'},
   ta:'عناق التهدئة المشتركة',te:'Co-regulation Hug',
   da:'احتضان هادئ مع صوت منخفض: "أنا بجانبك".',
   de:'Gentle hug with a low voice: "I am here with you".',
   ma:{ar:'لا يحتاج مواد',en:'No materials needed'},
   st:{ar:[
     'عند انزعاج الطفل اقترب بهدوء.',
     'اجلس على مستوى نظره.',
     'افتح ذراعيك وقل: "تعال، أنا بجانبك."',
     'احتضنه بثبات 30 ثانية دون كلام.',
     'تنفس بعمق بصوت مسموع.',
     'بعد الهدوء: "شكراً لأنك سمحت لي."'
   ],en:[
     'Approach calmly when upset.',
     'Sit at eye level.',
     'Open arms: "Come, I am here."',
     'Hold firmly 30 sec without talking.',
     'Breathe deeply and audibly.',
     'After: "Thank you for letting me be with you."'
   ]},
   pd:{ar:'تحكم في انفعالك أولاً، فأنت المنظّم العاطفي الخارجي للطفل.',
       en:'Control your own emotion first — you are the child\'s external regulator.'},
   wa:'هل تنخفض حدة البكاء؟',we:'Does crying intensity decrease?',
   src:'WHO Nurturing Care / NAP'},

  {ic:'🌉',du:{ar:'15 د',en:'15 min'},fr:{ar:'2×أسبوعيًا',en:'2×/week'},ag:[7,12],
   sk:{ar:'استعادة التوازن بعد الإحباط',en:'Recovery after frustration'},
   nb:{ar:'الاستسلام السريع وترك المهام عند الفشل الأول',en:'Quick surrender at first failure'},
   ta:'إعادة بناء الجسر',te:'Rebuild the Bridge',
   da:'بناء مجسم؛ عند سقوطه، استراحة قصيرة ثم محاولة جديدة.',
   de:'Build a model; when it falls, brief break then retry.',
   ma:{ar:'مكعبات خشبية أو كرتونية (20 قطعة)',en:'Wooden or cardboard blocks (20 pcs)'},
   st:{ar:[
     'اتفقا: "سنبني جسراً عالياً معاً."',
     'ابدأ البناء وأشركه في وضع المكعبات.',
     'اترك الجسر ينهار عمداً.',
     'قل: "أوه! انهار. نستريح دقيقة."',
     'بعد 60 ثانية: "الآن هادئون. لنجرب فكرة جديدة."',
     'جربا طريقة مختلفة (قاعدة أوسع).',
     'احتفل: "رأيت؟ المحاولة الثانية نجحت!"'
   ],en:[
     'Agree: "We will build a tall bridge."',
     'Start building, involve them.',
     'Let it collapse on purpose.',
     'Say: "Oops! It fell. Let\'s rest a minute."',
     'After 60 sec: "Now calm. Let\'s try a new idea."',
     'Try wider base.',
     'Celebrate: "See? Second try worked!"'
   ]},
   pd:{ar:'لا تنجز المهمة عن الطفل عند الفشل، بل اجعله يقود المحاولة الثانية.',
       en:'Don\'t finish for the child — let them lead the retry.'},
   wa:'هل يعود للمهمة بعد الإحباط؟',we:'Does he return to task after frustration?',
   src:'Harvard EF Guide'}
],

/* ═══════════ 3. التعاطف والوعي الاجتماعي ═══════════ */
'emo-empathy':[
  {ic:'🎁',du:{ar:'2 د',en:'2 min'},fr:{ar:'عند البكاء',en:'When crying'},ag:[3,5],
   sk:{ar:'الاستجابة لمشاعر الآخر',en:'Responding to others\' feelings'},
   nb:{ar:'عدم اكتراث الطفل لبكاء من حوله',en:'Indifference to others\' crying'},
   ta:'صندوق المواساة',te:'Comfort Box',
   da:'صندوق بلعبة محشوة ومنديل؛ يقدمه الطفل لمن يبكي.',
   de:'Box with a stuffed toy and tissue; child offers it to one crying.',
   ma:{ar:'صندوق صغير + لعبة محشوة + منديل',en:'Small box + stuffed toy + tissue'},
   st:{ar:[
     'جهّز الصندوق وضع فيه اللعبة والمنديل.',
     'عرّفه: "هذا صندوق المواساة."',
     'عند بكاء أخ/صديق: "ما رأيك أن نحضر له الصندوق؟"',
     'رافقه وهو يقدمه.',
     'بعدها: "أحسنت! ساعدته على التحسن."',
     'كرر في كل موقف.'
   ],en:[
     'Prepare box with toy and tissue.',
     'Introduce: "This is the comfort box."',
     'When someone cries: "Shall we bring the box?"',
     'Accompany them.',
     'After: "Well done! You helped."',
     'Repeat every time.'
   ]},
   pd:{ar:'لا تجبره، بل اقترح وامدح أي مبادرة ولو صغيرة.',en:'Don\'t force — suggest and praise any attempt.'},
   wa:'هل يبادر بتقديم غرض التهدئة؟',we:'Does he initiate offering comfort?',
   src:'WHO Care for Child Development'},

  {ic:'🎭',du:{ar:'10 د',en:'10 min'},fr:{ar:'2×أسبوعيًا',en:'2×/week'},ag:[3,6],
   sk:{ar:'التعبير اللفظي عن التعاطف',en:'Verbal expression of empathy'},
   nb:{ar:'الاكتفاء بالمشاهدة السلبية عند حزن الآخر',en:'Passive observation at others\' sadness'},
   ta:'محقق الاطمئنان اللفظي',te:'Empathy Detective',
   da:'تمثيل أدوار بالعرائس لصياغة جمل الدعم.',
   de:'Puppet role-play to practice supportive phrases.',
   ma:{ar:'عرائس أو جوارب قديمة للتمثيل',en:'Puppets or old socks'},
   st:{ar:[
     'أمسك دمية: "أنا صديقك، أشعر بالحزن."',
     'اسأل: "ماذا تقول لي؟"',
     'شجعه على: "هل أنت بخير؟" أو "هل أساعدك؟"',
     'بادل الأدوار: اجعله المطمئن.',
     'عزز كل جملة دعم.',
     'اختم: "اليوم تدربنا على جملة الصديق الجيد."'
   ],en:[
     'Hold puppet: "I am your friend, I feel sad."',
     'Ask: "What do you say?"',
     'Encourage: "Are you okay?" or "Can I help?"',
     'Swap roles.',
     'Reinforce every supportive phrase.',
     'Close: "Today we practiced being a good friend."'
   ]},
   pd:{ar:'العب دور الشخص الحزين بإقناع، وامدح كل عبارة تعاطف.',en:'Play the sad role convincingly, praise every phrase.'},
   wa:'هل يسأل تلقائيًا عن حال الآخرين؟',we:'Does he ask about others automatically?',
   src:'CASEL Framework'},

  {ic:'🤫',du:{ar:'30-60 د',en:'30-60 min'},fr:{ar:'عند المرض',en:'When sick'},ag:[7,12],
   sk:{ar:'مراعاة ظروف الآخرين',en:'Consideration of others\' circumstances'},
   nb:{ar:'الصراخ وإحداث الضوضاء رغم وجود مريض',en:'Noise despite a sick person'},
   ta:'ساعة الهدوء الأسرية',te:'Family Quiet Hour',
   da:'الاتفاق على نشاط همس مراعاةً لمريض.',
   de:'Agree on a whisper activity out of care for a sick member.',
   ma:{ar:'ألوان + ورق + كتاب هادئ',en:'Colors + paper + quiet book'},
   st:{ar:[
     'أخبر الطفل: "اليوم أخوك مريض، نحتاج هدوءاً."',
     'اشرح: "صوته المنخفض يساعده على الراحة."',
     'اتفقا على نشاط صامت.',
     'ذكّره بلطف عند رفع صوته.',
     'بعد ساعة: "ساعدت أخاك، هذا لطف كبير."'
   ],en:[
     'Tell: "Today your sibling is sick, we need quiet."',
     'Explain: "Quiet helps them rest."',
     'Agree on silent activity.',
     'Gently remind if voice rises.',
     'After: "You helped them rest, very kind."'
   ]},
   pd:{ar:'اربط الهدوء بالحرص العاطفي، لا بالأوامر.',en:'Link quiet to care, not to orders.'},
   wa:'هل يخفض صوته تلقائيًا؟',we:'Does he lower his voice automatically?',
   src:'NAP Parenting Matters'}
],

/* ═══════════ 4. الذاكرة العاملة ═══════════ */
'cog-memory':[
  {ic:'🎒',du:{ar:'10 د',en:'10 min'},fr:{ar:'3×أسبوعيًا',en:'3×/week'},ag:[5,7],
   sk:{ar:'تتبع التعليمات المتتابعة',en:'Following sequential instructions'},
   nb:{ar:'نسيان التوجيهات المركبة',en:'Forgetting multi-step instructions'},
   ta:'حقيبة السفر الذهنية',te:'Mental Suitcase',
   da:'لعبة "حزمت في حقيبتي..." مع إضافة أغراض متسلسلة.',
   de:'"I packed in my suitcase..." game adding items sequentially.',
   ma:{ar:'لا يحتاج مواد',en:'No materials needed'},
   st:{ar:[
     'ابدأ: "حزمت في حقيبتي قميصاً."',
     'اطلب: "أكمل واذكر ما قلت ثم أضف غرضاً."',
     'مثال: "قميص، ثم كتاب."',
     'استمرا 5-7 جولات مع زيادة الأغراض.',
     'عند الخطأ: "لا بأس، نبدأ من جديد."',
     'احتفل بالأطول تسلسلاً.'
   ],en:[
     'Start: "I packed a shirt."',
     'Ask: "Repeat then add one item."',
     'Example: "Shirt, then book."',
     'Continue 5-7 rounds.',
     'On mistake: "No worries, restart."',
     'Celebrate longest sequence.'
   ]},
   pd:{ar:'ابدأ بقائمتين فقط، وزِد تدريجياً حسب قدرة طفلك.',en:'Start with 2 items, increase gradually.'},
   wa:'هل يتذكر التسلسل؟',we:'Does he recall the sequence?',
   src:'Harvard EF Guide'},

  {ic:'👨‍🍳',du:{ar:'15 د',en:'15 min'},fr:{ar:'2×أسبوعيًا',en:'2×/week'},ag:[3,5],
   sk:{ar:'المعالجة الذهنية للمراحل',en:'Mental processing of stages'},
   nb:{ar:'التخبط الذهني عند المهام المتعددة',en:'Mental confusion in multi-step tasks'},
   ta:'الطاهي الصغير',te:'Little Chef',
   da:'تنفيذ وصفة من 3 خطوات دون تكرار مستمر.',
   de:'Follow a 3-step recipe without repetitive instructions.',
   ma:{ar:'خيار + طماطم + صحن + سكين بلاستيكي',en:'Cucumber + tomato + plate + plastic knife'},
   st:{ar:[
     'قل الخطوات مرة: "1. اغسل، 2. قطّع، 3. ضع في الصحن."',
     'اطلب البدء.',
     'دعه ينفذ دون تكرار التعليمات.',
     'إن نسي: "ما الخطوة التالية؟"',
     'عند الانتهاء: "أحسنت! أتممت 3 خطوات."'
   ],en:[
     'State steps once: "1. Wash, 2. Cut, 3. Plate."',
     'Ask to begin.',
     'Let them execute without repeating.',
     'If forgotten: "What\'s next?"',
     'On finish: "Great! 3 steps completed."'
   ]},
   pd:{ar:'لا تكرر الخطوات، واسأل بدلاً من أن تُلقّن.',en:'Don\'t repeat steps — ask instead.'},
   wa:'هل ينفذ الخطوة التالية تلقائيًا؟',we:'Does he do the next step automatically?',
   src:'Harvard EF Guide (Cooking Activities)'},

  {ic:'🎴',du:{ar:'10 د',en:'10 min'},fr:{ar:'3×أسبوعيًا',en:'3×/week'},ag:[5,7],
   sk:{ar:'الاحتفاظ بالمواقع والتحديث الذهني',en:'Retaining positions & updating'},
   nb:{ar:'ضعف التركيز واسترجاع الأماكن',en:'Weak focus and recall'},
   ta:'البحث عن المطابقات',te:'Memory Match',
   da:'لعبة الذاكرة ببطاقات مقلوبة لبناء خريطة ذهنية.',
   de:'Memory cards to build a mental map of positions.',
   ma:{ar:'12 بطاقة (6 أزواج) بأشكال متطابقة',en:'12 cards (6 pairs) with matching shapes'},
   st:{ar:[
     'اخلط البطاقات وضعها مقلوبة.',
     'كل لاعب يقلب بطاقتين للبحث عن تطابق.',
     'إن لم تتطابق، أعدهما كما كانتا.',
     'شجع: "أين رأينا الأسد؟"',
     'الفائز من يجمع أكثر أزواج.'
   ],en:[
     'Shuffle, lay face down.',
     'Each flips 2 to find a match.',
     'If no match, flip back.',
     'Encourage: "Where did we see the lion?"',
     'Winner collects most pairs.'
   ]},
   pd:{ar:'ابدأ بـ 4 بطاقات، وزد تدريجياً حتى 12.',en:'Start with 4 cards, build up to 12.'},
   wa:'هل تقل الأخطاء العشوائية؟',we:'Do errors decrease?',
   src:'Harvard EF Guide (Memory Games)'},

  {ic:'🧩',du:{ar:'15 د',en:'15 min'},fr:{ar:'2×أسبوعيًا',en:'2×/week'},ag:[7,12],
   sk:{ar:'الاحتفاظ بالخطوات الذهنية المتتابعة',en:'Retaining sequential mental steps'},
   nb:{ar:'التخبط في المهام الأكاديمية متعددة المراحل',en:'Confusion in multi-stage academic tasks'},
   ta:'لغز المراحل الثلاث',te:'Three-Step Puzzle',
   da:'حل مهمة متعددة الخطوات مع تتبع الخطة.',
   de:'Solve a multi-step task while tracking the plan.',
   ma:{ar:'بازل من 24-48 قطعة',en:'24-48 piece puzzle'},
   st:{ar:[
     'اكتب الخطة: "1. الحواف، 2. الألوان، 3. الربط."',
     'اطلب البدء بالحواف.',
     'بعد الانتهاء اسأل: "الخطوة التالية؟"',
     'لا تعطه الحل، ذكّره بالخطة.',
     'عند الانتهاء: "أكملت خطة من 3 مراحل."'
   ],en:[
     'Write plan: "1. Edges, 2. Colors, 3. Connect."',
     'Ask to start with edges.',
     'After edges: "Next step?"',
     'Don\'t solve — remind plan.',
     'On finish: "You completed 3-stage plan."'
   ]},
   pd:{ar:'اكتب الخطة على ورقة أمامه ليتذكرها بصرياً.',en:'Write the plan on paper for visual memory.'},
   wa:'هل يحافظ على التسلسل؟',we:'Does he keep the sequence?',
   src:'Harvard EF / NAP'}
],

/* ═══════════ 5. المرونة المعرفية ═══════════ */
'cog-flex':[
  {ic:'🔀',du:{ar:'10 د',en:'10 min'},fr:{ar:'3×أسبوعيًا',en:'3×/week'},ag:[3,5],
   sk:{ar:'التبديل المعرفي للتصنيف',en:'Cognitive shifting'},
   nb:{ar:'التصلب المعرفي والإصرار على قاعدة واحدة',en:'Cognitive rigidity'},
   ta:'التصنيف المقلوب',te:'Silly Sorting',
   da:'تصنيف المكعبات حسب اللون، ثم تغيير القاعدة فجأة للحجم.',
   de:'Sort blocks by color, then switch to size.',
   ma:{ar:'12 مكعباً بألوان وأحجام مختلفة',en:'12 blocks different colors and sizes'},
   st:{ar:[
     'قل: "رتب المكعبات حسب اللون."',
     'بعد الانتهاء صفّق: "القاعدة تغيرت! حسب الحجم."',
     'اضحك على التغيير المفاجئ.',
     'كرر التبديل 3-4 مرات.',
     'اختم: "اليوم تدربنا على تغيير الطريقة بسرعة."'
   ],en:[
     'Say: "Sort by color."',
     'Then: "Rule changed! Sort by size."',
     'Laugh at the change.',
     'Repeat switch 3-4 times.',
     'Close: "We practiced switching rules fast."'
   ]},
   pd:{ar:'اجعل التغيير ممتعاً ومضحكاً، وليس اختباراً.',en:'Make the change fun, not a test.'},
   wa:'هل ينتقل بسلاسة للقاعدة الجديدة؟',we:'Does he transition smoothly?',
   src:'Harvard EF Guide'},

  {ic:'📋',du:{ar:'10 د',en:'10 min'},fr:{ar:'أسبوعيًا',en:'Weekly'},ag:[5,8],
   sk:{ar:'التكيف مع تغيير الخطة',en:'Adapting to plan changes'},
   nb:{ar:'نوبات التذمر عند تغيير خطة الخروج',en:'Tantrums when plans change'},
   ta:'خطة (ب) الممتعة',te:'Plan B Game',
   da:'رسم خطة أساسية وخطة بديلة للأنشطة.',
   de:'Draw main and alternative plans for activities.',
   ma:{ar:'ورقة + قلم + ملصقات ملونة',en:'Paper + pen + colored stickers'},
   st:{ar:[
     'ارسم جدول عمودين: "الخطة أ" و"الخطة ب".',
     'مثال: "أ: نذهب للحديقة. ب: نلعب بالبيت لو أمطرت."',
     'اسأل: "ما الخطة البديلة لو تغير الجو؟"',
     'سجل اقتراحه وامدحه.',
     'عند تغير فعلي: "تذكر خطة ب؟ لنطبقها!"'
   ],en:[
     'Draw two columns: "Plan A" and "Plan B".',
     'Example: "A: park. B: home if rain."',
     'Ask: "What is B if weather changes?"',
     'Record suggestion and praise.',
     'When change: "Remember Plan B? Let\'s use it!"'
   ]},
   pd:{ar:'أشرك الطفل في وضع البدائل مسبقاً، لا بعد حدوث التغيير.',en:'Involve the child in planning B beforehand.'},
   wa:'هل يتقبل البديل دون مقاومة؟',we:'Does he accept the alternative?',
   src:'Tools of the Mind / CASEL'},

  {ic:'🎯',du:{ar:'15 د',en:'15 min'},fr:{ar:'2×أسبوعيًا',en:'2×/week'},ag:[7,12],
   sk:{ar:'ابتكار حلول بديلة',en:'Generating alternative solutions'},
   nb:{ar:'تكرار المحاولة الخاطئة بنفس الطريقة',en:'Repeating the same failed attempt'},
   ta:'لغز الطرق البديلة',te:'Alternative Paths Puzzle',
   da:'منع تكرار نفس المحاولة وإلزام الطفل بتجربة أفكار جديدة.',
   de:'Prevent retrying the same attempt; force new ideas.',
   ma:{ar:'بازل أو لعبة استراتيجية بسيطة',en:'Puzzle or simple strategy game'},
   st:{ar:[
     'اعرض المشكلة: "كيف نبني هذا البرج؟"',
     'عند الفشل الأول: "لا تكرر نفس الطريقة."',
     'اطلب: "جرب فكرة مختلفة تماماً."',
     'اجعل كل محاولة جديدة إجبارية.',
     'بعد 3 محاولات: "أحسنت، فكرت بطرق متعددة!"'
   ],en:[
     'Present: "How to build this tower?"',
     'On first fail: "Don\'t repeat same way."',
     'Ask: "Try a different idea."',
     'Force new attempts.',
     'After 3: "Great, multiple ways!"'
   ]},
   pd:{ar:'قاوم رغبتك في إعطاء الحل، واترك الطفل يكتشف.',en:'Resist giving solutions — let the child discover.'},
   wa:'هل يجرب طرقًا جديدة؟',we:'Does he try new approaches?',
   src:'Harvard EF Guide'}
],

/* ═══════════ 6. التفكير المنطقي ═══════════ */
'cog-reason':[
  {ic:'🔬',du:{ar:'15 د',en:'15 min'},fr:{ar:'أسبوعيًا',en:'Weekly'},ag:[3,6],
   sk:{ar:'الاستدلال السببي البسيط',en:'Basic causal reasoning'},
   nb:{ar:'إرجاع الأحداث لتفسيرات خيالية',en:'Magical explanations'},
   ta:'المكتشف الصغير',te:'Little Discoverer',
   da:'تجربة طفو/غرق الأغراض وسؤال "لماذا؟".',
   de:'Float/sink experiment asking "why?".',
   ma:{ar:'وعاء ماء + ملعقة + فلين + حجر + ورقة',en:'Water bowl + spoon + cork + stone + paper'},
   st:{ar:[
     'املأ وعاءً بالماء.',
     'اسأل قبل كل غرض: "سيطفو أم سيغرق؟"',
     'اختبر: الفلين، الورقة، الملعقة، الحجر.',
     'اسأل بعد كل غرض: "لماذا؟"',
     'لا تصحح الخطأ، اطرح أسئلة موجِّهة.'
   ],en:[
     'Fill bowl with water.',
     'Ask before each: "Float or sink?"',
     'Test: cork, paper, spoon, stone.',
     'Ask after: "Why?"',
     'Don\'t correct — guide with questions.'
   ]},
   pd:{ar:'دع الفضول يقود، ولو تكررت الإجابات الخاطئة.',en:'Let curiosity lead, even with wrong answers.'},
   wa:'هل يقدم تبريرات منطقية؟',we:'Does he give logical reasons?',
   src:'MIT Child Dev (Piaget)'},

  {ic:'🧠',du:{ar:'10 د',en:'10 min'},fr:{ar:'2×أسبوعيًا',en:'2×/week'},ag:[5,8],
   sk:{ar:'نظرية العقل (فهم المعتقد الخاطئ)',en:'Theory of Mind'},
   nb:{ar:'افتراض أن الآخرين يعلمون ما يعرفه الطفل',en:'Assuming others know what child knows'},
   ta:'ماذا يعلم صديقي؟',te:'What Does My Friend Know?',
   da:'نقل شيء دون علم الأخ، ثم السؤال: أين سيبحث؟',
   de:'Move an object without the sibling knowing; where will they look?',
   ma:{ar:'لعبة صغيرة + وعاءان',en:'Small toy + two boxes'},
   st:{ar:[
     'أخفِ اللعبة في الوعاء (أ) أمام أخ الطفل.',
     'اطلب من الأخ مغادرة الغرفة.',
     'انقل اللعبة إلى الوعاء (ب).',
     'اسأل الطفل: "أين سيبحث أخوك أولاً؟"',
     'الهدف: يجيب "في أ" لأن الأخ لا يعلم بالنقل.'
   ],en:[
     'Hide toy in box (A) in front of sibling.',
     'Ask sibling to leave.',
     'Move toy to box (B).',
     'Ask: "Where will he look first?"',
     'Goal: answer "A" because he doesn\'t know.'
   ]},
   pd:{ar:'لا تكشف الإجابة، بل دع الطفل يفكر بنفسه.',en:'Don\'t reveal — let the child think.'},
   wa:'هل يدرك أن الآخر لا يعلم؟',we:'Does he realize others don\'t know?',
   src:'MIT Child Dev (Theory of Mind)'},

  {ic:'⚖️',du:{ar:'5 د',en:'5 min'},fr:{ar:'عند الاختيار',en:'When choosing'},ag:[7,12],
   sk:{ar:'التقييم والموازنة المنطقية',en:'Logical evaluation'},
   nb:{ar:'الاختيار العشوائي دون تبرير',en:'Random choice without reasoning'},
   ta:'ميزان القرار اليومي',te:'Decision Balance',
   da:'طلب دليلين منطقيين لترجيح خيار.',
   de:'Ask for two logical reasons supporting a choice.',
   ma:{ar:'موقف اختيار يومي (حلوى، ملابس، لعبة)',en:'Daily choice (snack, clothes, toy)'},
   st:{ar:[
     'اعرض خيارين: "تفاحة أم موز؟"',
     'اسأل: "لماذا اخترت هذا؟"',
     'اطلب سبباً ثانياً: "وما السبب الآخر؟"',
     'ناقش بجدية دون فرض.',
     'اختم: "قرارك مدروس، أحسنت."'
   ],en:[
     'Present: "Apple or banana?"',
     'Ask: "Why this one?"',
     'Ask for second reason: "And another?"',
     'Discuss without imposing.',
     'Close: "Your decision is reasoned."'
   ]},
   pd:{ar:'لا تفرض خيارك بعد سماع الأسباب، إلا إن كان خطراً.',en:'Don\'t impose unless dangerous.'},
   wa:'هل يقدم حججًا متماسكة؟',we:'Does he provide coherent arguments?',
   src:'CASEL (Responsible Decision-Making)'}
],

/* ═══════════ 7. الضبط التثبيطي ═══════════ */
'beh-inhibit':[
  {ic:'🧊',du:{ar:'10 د',en:'10 min'},fr:{ar:'3×أسبوعيًا',en:'3×/week'},ag:[3,6],
   sk:{ar:'التثبيط الحركي',en:'Motor inhibition'},
   nb:{ar:'صعوبة كبح الحركة فور التنبيه',en:'Difficulty stopping movement'},
   ta:'التمثال المجمد',te:'Freeze Dance',
   da:'الرقص مع الموسيقى والتجمد فورًا عند توقفها.',
   de:'Dance with music; freeze instantly when it stops.',
   ma:{ar:'هاتف + أغنية حماسية',en:'Phone + energetic song'},
   st:{ar:[
     'شغّل الأغنية وارقص مع الطفل.',
     'أوقف فجأة: "تجمّد!"',
     'يقف كالتمثال 5 ثوانٍ.',
     'أعد التشغيل، وكرر 5-7 مرات.',
     'من يتحرك يفقد نقطة.'
   ],en:[
     'Play song, dance together.',
     'Stop suddenly: "Freeze!"',
     'Stay still 5 sec.',
     'Restart, repeat 5-7 times.',
     'Mover loses a point.'
   ]},
   pd:{ar:'شاركه الرقص بحماس، فالتجربة ممتعة قبل أن تكون تدريباً.',en:'Dance enthusiastically — fun first.'},
   wa:'هل يكبح جسده فورًا؟',we:'Does he freeze instantly?',
   src:'Harvard EF Guide (Freeze Dance)'},

  {ic:'🚦',du:{ar:'10 د',en:'10 min'},fr:{ar:'3×أسبوعيًا',en:'3×/week'},ag:[5,9],
   sk:{ar:'كبح الاستجابة ومراقبة البيئة',en:'Response inhibition'},
   nb:{ar:'صعوبة الانتظار والتسرع في الانطلاق',en:'Impulsive rushing'},
   ta:'إشارة المرور المنزلية',te:'Home Traffic Light',
   da:'بطاقات ملونة للجري والمشي والتوقف.',
   de:'Colored cards for run, walk, and stop.',
   ma:{ar:'3 بطاقات: حمراء، صفراء، خضراء',en:'3 cards: red, yellow, green'},
   st:{ar:[
     'اشرح: أخضر=اجرِ، أصفر=امشِ، أحمر=قف.',
     'ارفع البطاقات بتبديل سريع.',
     'يستجيب الطفل حسب اللون.',
     'سرّع التبديل تدريجياً.',
     'من يخطئ ينتظر جولة.'
   ],en:[
     'Explain: green=run, yellow=walk, red=stop.',
     'Show cards with rapid switches.',
     'Child responds per color.',
     'Gradually speed up.',
     'Mistake = skip a turn.'
   ]},
   pd:{ar:'ابدأ ببطيء، وزِد السرعة عند إتقان الأساس.',en:'Start slow, increase speed as mastery grows.'},
   wa:'هل يتوقف عند الأحمر؟',we:'Does he stop on red?',
   src:'Harvard EF Guide (Traffic Light)'},

  {ic:'✨',du:{ar:'10 د',en:'10 min'},fr:{ar:'3×أسبوعيًا',en:'3×/week'},ag:[5,9],
   sk:{ar:'ضبط الاندفاع اللفظي والحركي',en:'Inhibitory control'},
   nb:{ar:'تنفيذ التوجيه دون إشارة البدء',en:'Acting without the start signal'},
   ta:'الكلمة السحرية',te:'Magic Word (Simon Says)',
   da:'لا ينفذ إلا إذا سبقت التعليمات بالكلمة السحرية.',
   de:'Only act if the magic word precedes the instruction.',
   ma:{ar:'لا يحتاج مواد',en:'No materials needed'},
   st:{ar:[
     'قل: "سيمون يقول: صفّق." → يُنفذ.',
     'قل: "اقفز." → لا يُنفذ (لا كلمة سحرية).',
     'بدّل بسرعة بين الحالتين.',
     'من يخطئ يخرج جولة.',
     'الهدف: التمييز بين الحالتين.'
   ],en:[
     'Say: "Simon says: clap." → do it.',
     'Say: "Jump." → don\'t.',
     'Alternate rapidly.',
     'Mistake = sit out one round.',
     'Goal: distinguish both.'
   ]},
   pd:{ar:'العبها بمرح، والخطأ جزء من التعلم.',en:'Play playfully — mistakes are part of learning.'},
   wa:'هل يتريث قبل الحركة؟',we:'Does he pause before acting?',
   src:'Harvard EF Guide (Simon Says)'}
],

/* ═══════════ 8. الالتزام بالروتين ═══════════ */
'beh-routine':[
  {ic:'📅',du:{ar:'مستمر',en:'Ongoing'},fr:{ar:'يوميًا',en:'Daily'},ag:[5,9],
   sk:{ar:'التتابعية السلوكية الموجهة ذاتياً',en:'Self-directed sequential behavior'},
   nb:{ar:'المماطلة والاعتماد الشديد على الأوامر',en:'Procrastination & dependence'},
   ta:'لوحة محطات اليوم المصورة',te:'Day Stations Board',
   da:'لوحة بصور متتابعة لروتين العودة مع علامة صح.',
   de:'Board with sequential return-routine images with checkmarks.',
   ma:{ar:'ورق مقوى + صور مطبوعة أو مرسومة + ملصقات',en:'Cardboard + images + stickers'},
   st:{ar:[
     'ارسم 4 محطات: خلع الحذاء، غسل اليدين، الحقيبة، تغيير الملابس.',
     'علّق اللوحة عند مدخل البيت.',
     'عند الدخول أشر للوحة بصمت.',
     'يضع الطفل ملصقاً بعد كل محطة.',
     'بعد أسبوع: يستخدمها تلقائياً.'
   ],en:[
     'Draw 4 stations: shoes, hands, bag, clothes.',
     'Hang board at entrance.',
     'On entry point silently.',
     'Child places sticker after each.',
     'After a week: uses it automatically.'
   ]},
   pd:{ar:'الإشارة للصورة أقوى من التوجيه اللفظي المتكرر.',en:'Pointing to image beats repeated verbal cues.'},
   wa:'هل ينتقل بين المحطات باعتياد؟',we:'Does he transition habitually?',
   src:'NAP Parenting Matters (Routines)'},

  {ic:'⏱️',du:{ar:'5 د',en:'5 min'},fr:{ar:'يوميًا',en:'Daily'},ag:[7,12],
   sk:{ar:'المحافظة على البيئة وتنظيم الأدوات',en:'Environment organization'},
   nb:{ar:'ترك الألعاب مبعثرة ورفض الترتيب',en:'Refusing to tidy up'},
   ta:'تحدي 5 دقائق',te:'5-Minute Challenge',
   da:'مؤقت ونغمة حماسية لإعادة الألعاب لمواضعها.',
   de:'Timer with energetic tone to return toys before it rings.',
   ma:{ar:'هاتف بمؤقت + نغمة مرحة',en:'Phone with timer + fun ringtone'},
   st:{ar:[
     'قل: "لدينا 5 دقائق لترتيب كل شيء."',
     'شغّل المؤقت والنغمة.',
     'شاركه الترتيب بحماس.',
     'عند الرنين: "انتهى! كم رتبنا؟"',
     'احتفل بنجاح الفريق.'
   ],en:[
     'Say: "We have 5 minutes to tidy."',
     'Start timer and fun ring.',
     'Join tidying energetically.',
     'At ring: "Done! How many?"',
     'Celebrate team success.'
   ]},
   pd:{ar:'شارك في الترتيب، فالتحدي جماعي وليس اختباراً للطفل.',en:'Tidy together — team challenge, not a test.'},
   wa:'هل يستجيب بسرعة؟',we:'Does he respond quickly?',
   src:'Positive Parenting Toolkit'},

  {ic:'🎒',du:{ar:'10 د',en:'10 min'},fr:{ar:'يوميًا',en:'Daily'},ag:[7,12],
   sk:{ar:'التخطيط السلوكي والاستقلالية',en:'Behavioral planning & autonomy'},
   nb:{ar:'الارتباك الصباحي ونسيان الأدوات',en:'Morning chaos and forgetting items'},
   ta:'محطة الاستعداد للغد',te:'Tomorrow Prep Station',
   da:'تجهيز الأدوات والحقيبة مساءً عند مخرج البيت.',
   de:'Prepare tools and bag in the evening at the exit.',
   ma:{ar:'طاولة صغيرة عند المخرج + حقيبة + قائمة',en:'Small table at exit + bag + checklist'},
   st:{ar:[
     'جهّز طاولة صغيرة عند الباب.',
     'اكتب قائمة: ماء، دفتر، قلم، حقيبة.',
     'مساءً: يراجع الطفل القائمة ويضع الأشياء.',
     'صباحاً: يأخذها بسلاسة دون فوضى.',
     'كافئ الانسيابية الصباحية.'
   ],en:[
     'Set small table at door.',
     'Write list: water, notebook, pen, bag.',
     'Evening: child checks and packs.',
     'Morning: smooth pickup.',
     'Reward morning flow.'
   ]},
   pd:{ar:'راجع بصرياً فقط، ولا تفعلها بدلاً منه.',en:'Visual check only — don\'t do it for them.'},
   wa:'هل يخرج الصباح بسلاسة؟',we:'Does the morning flow smoothly?',
   src:'NAP Parenting Matters'}
],

/* ═══════════ 9. المهارات التواصلية ═══════════ */
'skl-comm':[
  {ic:'📖',du:{ar:'10-15 د',en:'10-15 min'},fr:{ar:'يوميًا',en:'Daily'},ag:[3,6],
   sk:{ar:'التعبير اللفظي وتوسيع الجمل',en:'Verbal expression & expansion'},
   nb:{ar:'الصمت أو استخدام الإشارات فقط',en:'Silence or gestures only'},
   ta:'القراءة الحوارية المتبادلة',te:'Dialogic Reading',
   da:'قراءة كتاب مصور مع أسئلة مفتوحة وتوسيع جمل الطفل.',
   de:"Read a picture book with open questions; expand child's sentences.",
   ma:{ar:'كتاب مصور يحبه الطفل',en:'Picture book the child loves'},
   st:{ar:[
     'اجلس معه وافتح الكتاب.',
     'قبل القراءة: "ما هذا على الغلاف؟"',
     'أثناء القراءة توقف واسأل: "ماذا سيحدث بعد؟"',
     'وسّع جمله: "القطة تجري" → "القطة السوداء تجري بسرعة."',
     'اطلب منه تكرار الجملة الموسعة.'
   ],en:[
     'Sit and open the book.',
     'Before: "What\'s on the cover?"',
     'While reading: "What happens next?"',
     'Expand: "Cat runs" → "The black cat runs fast."',
     'Ask them to repeat.'
   ]},
   pd:{ar:'لا تُصحح الأخطاء اللغوية بشكل مباشر، بل أعِد الصياغة الصحيحة تلقائياً.',en:'Don\'t correct directly — model the correct form.'},
   wa:'هل تزداد طول جملته؟',we:'Does his sentence length grow?',
   src:'NAP Dialogic Reading'},

  {ic:'🎤',du:{ar:'10 د',en:'10 min'},fr:{ar:'3×أسبوعيًا',en:'3×/week'},ag:[5,9],
   sk:{ar:'الاستماع التبادلي النشط',en:'Active listening'},
   nb:{ar:'مقاطعة الحديث أو الانشغال',en:'Interrupting or distraction'},
   ta:'مقابلة المذيع',te:'Talk Show Interview',
   da:'ميكروفون لعبة؛ لا يتكلم إلا حامله مع النظر للمتحدث.',
   de:'Toy microphone; only the holder speaks, looking at the other.',
   ma:{ar:'ميكروفون لعبة أو زجاجة فارغة',en:'Toy microphone or empty bottle'},
   st:{ar:[
     'أمسك الميكروفون: "اليوم نستضيف نجمنا."',
     'اطرح سؤالاً: "ما أفضل شيء في يومك؟"',
     'سلّم الميكروفون للطفل.',
     'يجب أن ينظر إليك أثناء الحديث.',
     'بعد إجابته بدّل الأدوار.'
   ],en:[
     'Hold mic: "Today we host our star."',
     'Ask: "Best thing in your day?"',
     'Hand mic to child.',
     'Must look at you while speaking.',
     'Swap roles after answer.'
   ]},
   pd:{ar:'انظر في عيني الطفل وأنت تستمع، لتُعلّمه بالنموذج.',en:'Look in their eyes when listening — model it.'},
   wa:'هل ينتظر دوره وينظر للمتحدث؟',we:'Does he wait and look at speaker?',
   src:'CASEL (Relationship Skills)'},

  {ic:'❓',du:{ar:'10 د',en:'10 min'},fr:{ar:'2×أسبوعيًا',en:'2×/week'},ag:[7,12],
   sk:{ar:'استيضاح عدم الفهم',en:'Clarifying confusion'},
   nb:{ar:'الانسحاب وتظاهر الفهم',en:'Withdrawal or pretending to understand'},
   ta:'مراسل الاستفسار',te:'Curious Reporter',
   da:'تعليمات غامضة قصدًا وتشجيع الطفل على السؤال.',
   de:'Deliberately vague instructions; encourage child to ask.',
   ma:{ar:'ورقة + قلم رصاص',en:'Paper + pencil'},
   st:{ar:[
     'قل: "ارسم شيئاً جميلاً بقلمك."',
     'الطفل سيسأل: "أي قلم؟ ماذا أرسم؟"',
     'قل: "أحسنت! السؤال الذكي خطوة أولى."',
     'أجب عن كل سؤال.',
     'اختم: "اليوم تعلمنا أن السؤال لا يخجل."'
   ],en:[
     'Say: "Draw something nice with your pen."',
     'Child will ask: "Which pen? What?"',
     'Say: "Great! Smart question is first step."',
     'Answer every question.',
     'Close: "Asking is not shameful."'
   ]},
   pd:{ar:'اعتبر كل سؤال ذكاءً، وليس إزعاجاً.',en:'Treat every question as intelligence, not nuisance.'},
   wa:'هل يطرح أسئلة استفسارية؟',we:'Does he ask clarifying questions?',
   src:'CASEL / REDI-P'}
],

/* ═══════════ 10. المهارات الاجتماعية ═══════════ */
'skl-social':[
  {ic:'⏳',du:{ar:'15 د',en:'15 min'},fr:{ar:'عند اللعب',en:'During play'},ag:[3,6],
   sk:{ar:'التشارك بالتناوب',en:'Turn-taking'},
   nb:{ar:'احتكار الألعاب والصراخ عند المشاركة',en:'Toy hoarding and screaming'},
   ta:'عداد التناوب',te:'Turn Timer',
   da:'مؤقت رملي دقيقتان للتبادل بين الأطفال.',
   de:'Two-minute sand timer to alternate between children.',
   ma:{ar:'مؤقت رملي أو مؤقت هاتف',en:'Sand timer or phone timer'},
   st:{ar:[
     'اشرح: "كل واحد يلعب دقيقتين ثم يسلّم."',
     'شغّل المؤقت عند بدء الدور.',
     'عند الانتهاء: "انتهى دورك، سلّم اللعبة."',
     'امدح كل تسليم هادئ.',
     'كرر التبادل 3-4 مرات.'
   ],en:[
     'Explain: "Each plays 2 minutes then passes."',
     'Start timer at turn start.',
     'When done: "Turn over, pass toy."',
     'Praise each calm pass.',
     'Repeat 3-4 rounds.'
   ]},
   pd:{ar:'لا تتدخل فوراً عند الخلاف، أعطِ فرصة للحل الذاتي.',en:'Don\'t intervene instantly — allow self-solving.'},
   wa:'هل يسلّم اللعبة بهدوء؟',we:'Does he hand over calmly?',
   src:'PCIT / Tools of the Mind'},

  {ic:'🌉',du:{ar:'5 د',en:'5 min'},fr:{ar:'عند النزاع',en:'During conflict'},ag:[5,9],
   sk:{ar:'التفاوض واقتراح الحلول',en:'Negotiation & solutions'},
   nb:{ar:'اللجوء للضرب أو البكاء عند الخلاف',en:'Hitting or crying during conflict'},
   ta:'جسور الحلول الوسطى',te:'Solutions Bridge',
   da:'بطاقة حلول لسؤال الطرفين عن حل يرضيهما معًا.',
   de:'Solutions card to ask both parties for a mutually acceptable fix.',
   ma:{ar:'بطاقة عليها رسم جسر + قلم',en:'Card with bridge drawing + pen'},
   st:{ar:[
     'عند الخلاف أمسك البطاقة.',
     'قل: "سنبني جسراً للحل معاً."',
     'اسأل كل طرف: "ماذا تريد؟"',
     'اقترح: "دورك أولاً ثم دوره، اتفقنا؟"',
     'اكتب الاتفاق وعلق البطاقة.'
   ],en:[
     'During conflict hold the card.',
     'Say: "We will build a bridge together."',
     'Ask each: "What do you want?"',
     'Suggest: "Your turn then theirs, deal?"',
     'Write deal and hang card.'
   ]},
   pd:{ar:'كن وسيطاً حيادياً، ولا تفرض الحل الجاهز.',en:'Be neutral — don\'t impose the solution.'},
   wa:'هل يقترح حلولًا وسيطة؟',we:'Does he suggest solutions?',
   src:'Incredible Years / CASEL'},

  {ic:'🏗️',du:{ar:'30 د',en:'30 min'},fr:{ar:'أسبوعيًا',en:'Weekly'},ag:[7,12],
   sk:{ar:'العمل الجماعي والتعاون',en:'Teamwork & cooperation'},
   nb:{ar:'السيطرة المطلقة أو الانسحاب',en:'Total control or withdrawal'},
   ta:'مشروع البناء الجماعي',te:'Team Build Project',
   da:'بناء مدينة من الوسائد مع توزيع أدوار.',
   de:'Build a pillow city with assigned roles.',
   ma:{ar:'وسائد + بطاطين + كراسي',en:'Pillows + blankets + chairs'},
   st:{ar:[
     'وزّع الأدوار: مهندس، جامع مواد، باني.',
     'اكتب المهام على ورقة.',
     'راقب من بعيد دون تدخل.',
     'عند الخلاف: "تذكروا الأدوار."',
     'عند الانتهاء: "فريق رائع!"'
   ],en:[
     'Assign roles: engineer, gatherer, builder.',
     'Write tasks on paper.',
     'Watch from afar.',
     'On conflict: "Remember roles."',
     'On finish: "Amazing team!"'
   ]},
   pd:{ar:'لا تتدخل إلا إذا انسد التواصل تماماً.',en:'Only intervene if communication breaks down.'},
   wa:'هل يلتزم بدوره ويتعاون؟',we:'Does he stick to his role?',
   src:'Harvard EF / ParentCorps'}
]

};

/* ═══════════ 4. ACHIEVEMENTS ═══════════ */
const ACHS = [
  {id:'first',icon:'🌟',name:{ar:'البداية',en:'First Step'},check:s=>s.total>=1},
  {id:'s3',   icon:'🔥',name:{ar:'3 أيام',en:'3 Days'},       check:s=>s.streak>=3},
  {id:'s7',   icon:'⚡',name:{ar:'أسبوع',en:'1 Week'},         check:s=>s.streak>=7},
  {id:'s14',  icon:'💫',name:{ar:'14 يومًا',en:'2 Weeks'},     check:s=>s.streak>=14},
  {id:'s30',  icon:'👑',name:{ar:'شهر',en:'1 Month'},         check:s=>s.streak>=30},
  {id:'a10',  icon:'🎯',name:{ar:'10 أنشطة',en:'10 Acts'},     check:s=>s.total>=10},
  {id:'a30',  icon:'🏆',name:{ar:'30 نشاطًا',en:'30 Acts'},    check:s=>s.total>=30},
  {id:'a100', icon:'💎',name:{ar:'100 نشاط',en:'100 Acts'},    check:s=>s.total>=100},
  {id:'done', icon:'📋',name:{ar:'التقييم',en:'Assessment'},   check:s=>!!s.assessed}
];

/* ═══════════ 5. I18N ═══════════ */
const T = {
  ar:{
    appName:'نبض التميز', welcomeTitle:'نبض التميّز',
    welcomeSub:'رحلة يومية مع طفلك: تقييم، أنشطة، وتتبع تطور',
    welcomeStart:'ابدأ الرحلة', welcomeTime:'⏱️ مدة التقييم: 10-15 دقيقة',
    welcomeF1:'تقييم شامل',welcomeF1d:'4 محاور نمائية رئيسية',
    welcomeF2:'نشاط يومي',welcomeF2d:'تمرين منزلي بسيط كل يوم',
    welcomeF3:'إنجازات وتقدم',welcomeF3d:'تتبع التطور واحتفل بكل خطوة',
    childTitle:'بيانات الطفل',childSub:'سنخصص التجربة حسب عمره',
    childName:'👶 اسم الطفل (اختياري)',childNamePh:'مثال: يوسف',
    childAge:'🎂 العمر بالسنة *',childAgePh:'اختر العمر',
    childGender:'⚧ الجنس (اختياري)',childMale:'👦 ولد',childFemale:'👧 بنت',
    childNext:'متابعة للتقييم',
    qNext:'التالي',qShowResult:'عرض النتائج ✨',qChoose:'اختر إجابة',
    qOpt1:'لم يظهر بعد',qOpt1h:'يحتاج دائمًا للمساعدة',
    qOpt2:'يظهر أحيانًا',qOpt2h:'يحتاج تذكيرًا أو مساعدة جزئية',
    qOpt3:'يظهر غالبًا',qOpt3h:'بمبادرة ذاتية غالبًا',
    qOpt4:'بثبات واستقلالية',qOpt4h:'بانتظام ودون تذكير',
    resultsTitle:'نتائج التقييم',
    resultsScoreLbl:'نبض التميّز',resultsNoticeT:'تنويه منهجي',
    resultsNoticeB:' هذه الدرجة تعبّر عن مستوى ظهور المهارات في بيئة طفلك الحالية. ليست تشخيصًا طبيًا ولا مقارنة بأقران.',
    resultsDomains:'المحاور الأربعة',resultsSubdomains:'المجالات الفرعية',
    resultsStartCompanion:'ابدأ رحلة الرفيق اليومي',
    statusHigh:'أداء مرتفع نسبيًا',statusMid:'مجال متوازن',statusLow:'فرصة واعدة للتعزيز',
    homeDay:'يوم',homeMoodQ:'💭 كيف حال طفلك اليوم؟',
    homeToday:'🎯 نشاط اليوم',homeWeek:'📊 تقدم الأسبوع',
    homeStats:'📈 ملخص سريع',
    homeStatActs:'نشاط',homeStatLong:'أطول سلسلة',homeStatAch:'إنجاز',
    todayLbl:'اليوم',doneToday:'🎉 أُنجز اليوم — رائع!',
    startActivity:'ابدأ النشاط 🎯',viewDetails:'📖 التفاصيل',
    activityDone:'🎉 أحسنت! أنجزت نشاط اليوم',
    logThis:'سجّل هذا النشاط',backHome:'← العودة للرئيسية',
    watchFor:'👀 ما الذي تراقبه؟',tips:'💡 نصائح للتنفيذ',
    tips1:'اختر وقتًا هادئًا بدون مشتتات.',
    tips2:'اجعلها لعبة لا واجبًا.',
    tips3:'الثناء على الجهد لا النتيجة.',
    actsTitle:'مكتبة الأنشطة',actsSub:'الأنشطة المنزلية المتاحة',
    actsAll:'الكل',actsEmpty:'لا توجد أنشطة',
    progStreakLbl:'🔥 أيام متتالية',
    progWeekChart:'📅 آخر 7 أيام',progAchievements:'🏆 الإنجازات',
    progStart:'ابدأ اليوم لبناء سلسلتك 🔥',progGreat:'بداية رائعة',
    progGood:'أنت في الطريق الصحيح 💪',progChamp:'أنت بطل حقيقي 👑',
    profileTitle:'الملف الشخصي',profileSub:'إعدادات وبيانات',
    setDark:'🌙 الوضع المظلم',setDarkSub:'استخدام مريح ليلاً',
    setSound:'🔊 الأصوات',setSoundSub:'نقرات وتنبيهات',
    setLang:'🌐 اللغة',setLangSub:'العربية / English',
    setReassess:'إعادة التقييم',setReassessSub:'بدء تقييم جديد',
    setReset:'مسح كل البيانات',setResetSub:'حذف نهائي',
    version:'الإصدار',
    navHome:'الرئيسية',navActs:'الأنشطة',navLog:'تسجيل',navProg:'التقدم',navProfile:'الملف',
    logTitle:'سجّل نشاط اليوم',logMood:'كيف كانت التجربة؟',
    logM1:'ممتاز',logM2:'جيد',logM3:'عادي',logM4:'صعب',logM5:'لم ينجح',
    logNote:'📝 ملاحظة (اختياري)',logNotePh:'ملاحظات...',
    logCancel:'إلغاء',logSave:'حفظ',
    greetMorning:'صباح الخير ☀️',greetAfternoon:'مساء الخير 🌤️',greetEvening:'مساء الخير 🌙',
    week1:'الأسبوع الأول',week2:'الأسبوع الثاني',week3:'الأسبوع الثالث',week4:'الأسبوع الرابع',
    weekDone:'انتهت الرحلة',
    toastSaved:'🎉 تم الحفظ',toastMood:'💭 تم تسجيل المزاج',
    toastStreak:'🔥 سلسلتك الآن',toastChooseMood:'اختر شعورك',
    toastAge:'الرجاء اختيار العمر',toastAnswer:'الرجاء اختيار إجابة',
    toastAllDone:'أكملت جميع الأنشطة',
    confirmReset:'مسح كل البيانات؟',confirmReassess:'بدء تقييم جديد؟'
  },
  en:{
    appName:'pulse-of-excellence', welcomeTitle:'pulse-of-excellence',
    welcomeSub:'A daily journey with your child: assessment, activities & progress',
    welcomeStart:'Start the Journey', welcomeTime:'⏱️ Duration: 10-15 minutes',
    welcomeF1:'Complete Assessment',welcomeF1d:'4 main developmental domains',
    welcomeF2:'Daily Activity',welcomeF2d:'Simple home exercise every day',
    welcomeF3:'Achievements & Progress',welcomeF3d:'Track growth, celebrate each step',
    childTitle:'Child Information',childSub:'We will tailor the experience to their age',
    childName:'👶 Child name (optional)',childNamePh:'e.g., Youssef',
    childAge:'🎂 Age in years *',childAgePh:'Choose age',
    childGender:'⚧ Gender (optional)',childMale:'👦 Boy',childFemale:'👧 Girl',
    childNext:'Continue to assessment',
    qNext:'Next',qShowResult:'Show Results ✨',qChoose:'Please select an answer',
    qOpt1:'Not yet',qOpt1h:'Always needs help',
    qOpt2:'Sometimes',qOpt2h:'Needs reminder or partial help',
    qOpt3:'Often',qOpt3h:'Often self-initiated',
    qOpt4:'Consistently',qOpt4h:'Regularly, no reminders',
    resultsTitle:'Assessment Results',
    resultsScoreLbl:'Pulse Score',resultsNoticeT:'Methodological note',
    resultsNoticeB:" This score reflects the level of skills in your child's current environment. It is not a medical diagnosis nor a comparison with peers.",
    resultsDomains:'Four Domains',resultsSubdomains:'Sub-domains',
    resultsStartCompanion:'Start Daily Companion Journey',
    statusHigh:'Relatively high performance',statusMid:'Balanced area',statusLow:'Promising area for growth',
    homeDay:'days',homeMoodQ:'💭 How is your child today?',
    homeToday:"🎯 Today's Activity",homeWeek:'📊 Week Progress',
    homeStats:'📈 Quick Stats',
    homeStatActs:'Activities',homeStatLong:'Longest streak',homeStatAch:'Achievements',
    todayLbl:'Today',doneToday:'🎉 Done today — awesome!',
    startActivity:'Start Activity 🎯',viewDetails:'📖 Details',
    activityDone:"🎉 Well done! Today's activity is complete",
    logThis:'Log this activity',backHome:'← Back to home',
    watchFor:'👀 What to watch for?',tips:'💡 Implementation tips',
    tips1:'Choose a calm time without distractions.',
    tips2:'Make it a game, not a chore.',
    tips3:'Praise effort, not results.',
    actsTitle:'Activity Library',actsSub:'Available home activities',
    actsAll:'All',actsEmpty:'No activities found',
    progStreakLbl:'🔥 Consecutive days',
    progWeekChart:'📅 Last 7 days',progAchievements:'🏆 Achievements',
    progStart:'Start today to build your streak 🔥',progGreat:'Great start',
    progGood:'On the right track 💪',progChamp:"You're a true champion 👑",
    profileTitle:'Profile',profileSub:'Settings and data',
    setDark:'🌙 Dark Mode',setDarkSub:'Comfortable use at night',
    setSound:'🔊 Sound',setSoundSub:'Clicks and alerts',
    setLang:'🌐 Language',setLangSub:'العربية / English',
    setReassess:'Reassess',setReassessSub:'Start new assessment',
    setReset:'Reset all data',setResetSub:'Permanent deletion',
    version:'Version',
    navHome:'Home',navActs:'Activities',navLog:'Log',navProg:'Progress',navProfile:'Profile',
    logTitle:"Log today's activity",logMood:'How was the experience?',
    logM1:'Excellent',logM2:'Good',logM3:'OK',logM4:'Hard',logM5:'Did not work',
    logNote:'📝 Note (optional)',logNotePh:'Notes...',
    logCancel:'Cancel',logSave:'Save',
    greetMorning:'Good morning ☀️',greetAfternoon:'Good afternoon 🌤️',greetEvening:'Good evening 🌙',
    week1:'Week 1',week2:'Week 2',week3:'Week 3',week4:'Week 4',
    weekDone:'Journey completed',
    toastSaved:'🎉 Saved',toastMood:'💭 Mood recorded',
    toastStreak:'🔥 Streak:',toastChooseMood:'Choose a mood',
    toastAge:'Please choose age',toastAnswer:'Please select an answer',
    toastAllDone:'All activities completed',
    confirmReset:'Reset all data?',confirmReassess:'Start new assessment?'
  }
};
function t(k){ return (T[LANG] && T[LANG][k]) || k; }
function tObj(o){ return o ? (o[LANG] || o.ar || o.en || '') : ''; }

/* ═══════════ 6. STATE ═══════════ */
const KEY='nabd_v7';
const DEF={theme:'light',sound:true,onboarded:false,child:null,assessment:null,plan:null,logs:[],moods:{},answers:{},qIdx:0,pendingDestination:null};
let S = JSON.parse(JSON.stringify(DEF));
function save(){ try{ localStorage.setItem(KEY, JSON.stringify(S)); }catch(e){} }
function load(){ try{ const x=localStorage.getItem(KEY); if(x) S=Object.assign({},DEF,JSON.parse(x)); }catch(e){} }
function today(){ return new Date().toISOString().slice(0,10); }
function daysDiff(a,b){ return Math.round((new Date(b)-new Date(a))/86400000); }
function vib(p){ if(navigator.vibrate) navigator.vibrate(p); }

/* ═══════════ 7. SOUND ═══════════ */
const Snd = (()=>{
  let c=null;
  function init(){ if(!c){ try{ c=new (window.AudioContext||window.webkitAudioContext)(); }catch(e){} } if(c&&c.state==='suspended') c.resume(); return c; }
  function beep({f=800,d=.07,ty='sine',v=.12,dl=0}={}){
    if(!S.sound) return; const x=init(); if(!x) return;
    const t0=x.currentTime+dl; const o=x.createOscillator(), g=x.createGain();
    o.type=ty; o.frequency.setValueAtTime(f,t0);
    g.gain.setValueAtTime(v,t0); g.gain.exponentialRampToValueAtTime(.0001,t0+d);
    o.connect(g); g.connect(x.destination); o.start(t0); o.stop(t0+d+.02);
  }
  return {
    click(){ beep({f:800,d:.05}); },
    tap(){ beep({f:600,d:.04,ty:'triangle',v:.1}); },
    success(){ beep({f:523,d:.12,v:.15}); beep({f:659,d:.12,v:.15,dl:.1}); beep({f:784,d:.2,v:.15,dl:.2}); },
    celebrate(){ [523,659,784,1047].forEach((f,i)=>beep({f,d:.14,ty:'triangle',v:.14,dl:i*.09})); },
    unlock(){ init(); }
  };
})();

/* ═══════════ 8. TOAST & CONFETTI ═══════════ */
function toast(msg, ms=2400){
  const el=$('#toast'); el.textContent=msg; el.classList.add('visible');
  clearTimeout(el._t); el._t=setTimeout(()=>el.classList.remove('visible'), ms);
}
function confetti(){
  const cs=['#7C3AED','#FF6B9D','#06D6A0','#FFD166','#4ECDC4'];
  for(let i=0;i<70;i++){
    const p=document.createElement('div'); p.className='confetti';
    p.style.left=Math.random()*100+'vw';
    p.style.background=cs[Math.floor(Math.random()*cs.length)];
    p.style.animationDelay=(Math.random()*.5)+'s';
    if(Math.random()>.5) p.style.borderRadius='50%';
    document.body.appendChild(p); setTimeout(()=>p.remove(), 3400);
  }
}

/* ═══════════ 9. NAVIGATION ═══════════ */
const TITLES={
  welcome:()=>t('welcomeTitle'), child:()=>t('childTitle'), questions:()=>t('childTitle'),
  results:()=>t('resultsTitle'),
  home:()=>t('navHome'), today:()=>t('homeToday'),
  activities:()=>t('actsTitle'), progress:()=>t('navProg'), profile:()=>t('profileTitle')
};
const DARK_SCREENS=['welcome','results','home','progress','today'];
const NAV_SCREENS=['home','activities','progress','profile','today'];

function go(screen){
  // 1) تبديل الشاشات النشطة
  $$('.screen').forEach(s=>s.classList.remove('active'));
  const el=document.getElementById('screen-'+screen);
  if(el) el.classList.add('active');

  // 2) عنوان الشريط العلوي
  const titleFn=TITLES[screen];
  if(titleFn) $('#topTitle').textContent=titleFn();

  // 3) الشريط العلوي داكن في هذه الشاشات
  $('#topbar').classList.toggle('dark', DARK_SCREENS.includes(screen));

  // 4) زر الرجوع
  const showBack=['child','questions','today'].includes(screen);
  $('#backBtn').classList.toggle('hidden', !showBack);

  // 5) القائمة السفلية — الآن تشمل شاشة "today" أيضاً
  const showNav = ['home','activities','progress','profile','today'].includes(screen);
  $('#nav').classList.toggle('visible', showNav);
  document.body.classList.toggle('nav-visible', showNav);

  // 6) تفعيل زر التبويب النشط
  if(showNav){
    $$('#nav button[data-go]').forEach(b=>{
      b.classList.toggle('active', b.dataset.go===screen);
    });
  }

  // 7) إخفاء الفوتر في كل شاشات التطبيق (وليس الترحيب/بيانات الطفل)
  const inApp = screen !== 'welcome' && screen !== 'child';
  document.body.classList.toggle('app-active', inApp);

  // 8) التمرير لأعلى + حفظ الحالة
  window.scrollTo({top:0, behavior:'instant'});
  save();
}
function currentScreen(){
  const a=document.querySelector('.screen.active');
  return a? a.id.replace('screen-','') : 'welcome';
}
$('#backBtn').addEventListener('click', ()=>{
  const cur=currentScreen();
  const map={child:'welcome', questions:'child', today:'home'};
  go(map[cur]||'home');
});

/* Bottom nav */
$$('#nav button[data-go]').forEach(b=>b.addEventListener('click', ()=>{
  const s=b.dataset.go;
  if(s==='home') renderHome();
  if(s==='activities') renderActivities();
  if(s==='progress') renderProgress();
  if(s==='profile') renderProfile();
  go(s); Snd.tap();
}));
/* NOTE: #navCenter is bound once, further below (section 22). */

/* ═══════════ 10. THEME ═══════════ */
function applyTheme(){
  document.documentElement.setAttribute('data-theme', S.theme);
  const m=$('#themeColor'); if(m) m.content = S.theme==='dark' ? '#0A0817' : '#F8F7FC';
  const d=$('#darkToggle');
  if(d){ d.textContent = S.theme==='dark' ? (IS_AR?'مفعّل ✓':'ON ✓') : (IS_AR?'تشغيل':'OFF');
    d.classList.toggle('on', S.theme==='dark'); }
}

   function updateCompanionButtonText(){
  const sc = $('#startCompanion');
  if(!sc) return;
  if(S.pendingDestination){
    const map = {
      child:      IS_AR ? '🎯 المتابعة لإعادة التقييم'      : '🎯 Continue to Re-assess',
      activities: IS_AR ? '📅 المتابعة لمكتبة الأنشطة'      : '📅 Continue to Activities',
      progress:   IS_AR ? '🏆 المتابعة لصفحة التقدم'        : '🏆 Continue to Progress'
    };
    sc.textContent = map[S.pendingDestination] || ('🚀 ' + t('resultsStartCompanion'));
  } else {
    sc.textContent = '🚀 ' + t('resultsStartCompanion');
  }
}
/* ═══════════ 10.b APPLY STATIC I18N ═══════════ */
function applyStaticI18n(){
  const wt = document.querySelector('#screen-welcome h1');
  if(wt) wt.textContent = t('welcomeTitle');
  const sl = document.querySelector('.streak .lbl');
  if(sl) sl.textContent = t('homeDay');
  const rl = document.querySelector('.ring .lbl');
  if(rl) rl.textContent = t('resultsScoreLbl');
  updateCompanionButtonText();
  const nb = $('#qNextBtn');
  if(nb && !nb.disabled) nb.textContent = t('qNext');
}

/* ═══════════ 11. WELCOME ═══════════ */
$('#startBtn').addEventListener('click', ()=>{ Snd.click(); go('child'); });

/* ═══════════ 12. CHILD ═══════════ */
let tmpGender=null;
$$('#genderChips .chip').forEach(c=>c.addEventListener('click', ()=>{
  $$('#genderChips .chip').forEach(x=>x.classList.remove('active'));
  c.classList.add('active'); tmpGender=c.dataset.v; Snd.click();
}));
$('#childAge').addEventListener('change', e=>{ $('#toQuestions').disabled=!e.target.value; });
$('#toQuestions').addEventListener('click', ()=>{
  const name=$('#childName').value.trim();
  const age=parseInt($('#childAge').value,10);
  if(!age){ toast(t('toastAge')); return; }
  S.child={name: name||(IS_AR?'طفلي':'My Child'), age, gender:tmpGender};
  S.answers={}; S.qIdx=0; save(); Snd.click();
  go('questions'); renderQuestion();
});

/* ═══════════ 13. QUESTIONS ═══════════ */
function renderQuestion(){
  const q=QS[S.qIdx]; if(!q) return;
  const total=QS.length, pct=Math.round((S.qIdx/total)*100);
  $('#qProgressText').textContent=(S.qIdx+1)+' / '+total;
  $('#qPercent').innerHTML=pct+'<small>%</small>';
  $('#qProgressFill').style.width=Math.max(pct,3)+'%';
  const dom=DOMAINS[q.d];
  const opts=[
    {v:0,ic:'🌱',l:t('qOpt1'),h:t('qOpt1h')},
    {v:1,ic:'🌿',l:t('qOpt2'),h:t('qOpt2h')},
    {v:2,ic:'🌳',l:t('qOpt3'),h:t('qOpt3h')},
    {v:3,ic:'⭐',l:t('qOpt4'),h:t('qOpt4h')}
  ];
  const ans=S.answers[q.id];
  $('#qContainer').innerHTML=`
    <div class="q-chip" style="background:${dom.color}1a;color:${dom.color}">${dom.icon} ${IS_AR?dom.ar:dom.en}</div>
    <div class="q-text">${IS_AR?q.ar:q.en}</div>
    <div id="qOptions">${opts.map(o=>`
      <button class="q-opt ${ans===o.v?'selected':''}" data-v="${o.v}">
        <span class="radio"></span>
        <span class="body">
          <span>${o.ic} ${o.l}</span>
          <span class="hint">${o.h}</span>
        </span>
      </button>`).join('')}</div>`;
  $$('#qOptions .q-opt').forEach(b=>b.addEventListener('click', ()=>{
    S.answers[q.id]=parseInt(b.dataset.v,10);
    $$('#qOptions .q-opt').forEach(x=>x.classList.toggle('selected', x===b));
    $('#qNextBtn').disabled=false; Snd.tap(); vib(8); save();
  }));
  $('#qPrevBtn').style.visibility = S.qIdx===0 ? 'hidden' : 'visible';
  $('#qNextBtn').disabled = ans===undefined;
  $('#qNextBtn').textContent = S.qIdx===total-1 ? t('qShowResult') : t('qNext');
}
$('#qPrevBtn').addEventListener('click', ()=>{ if(S.qIdx>0){ S.qIdx--; renderQuestion(); Snd.tap(); } });
$('#qNextBtn').addEventListener('click', ()=>{
  const q=QS[S.qIdx];
  if(S.answers[q.id]===undefined){ toast(t('toastAnswer')); return; }
  if(S.qIdx < QS.length-1){ S.qIdx++; renderQuestion(); Snd.tap(); }
  else finalize();
});

/* ═══════════ 14. SCORING ═══════════ */
function computeResults(answers){
  const sub={}, dom={};
  QS.forEach(q=>{
    const v=answers[q.id]; if(v===undefined) return;
    if(!sub[q.s]) sub[q.s]={sum:0,n:0}; sub[q.s].sum+=v; sub[q.s].n++;
    if(!dom[q.d]) dom[q.d]={sum:0,n:0}; dom[q.d].sum+=v; dom[q.d].n++;
  });
  const subs={}, doms={};
  Object.keys(sub).forEach(k=>subs[k]=(sub[k].sum/(sub[k].n*3))*100);
  Object.keys(dom).forEach(k=>doms[k]=(dom[k].sum/(dom[k].n*3))*100);
  const ts=Object.values(dom).reduce((a,b)=>a+b.sum,0);
  const tm=Object.values(dom).reduce((a,b)=>a+b.n*3,0);
  return {subs, doms, overall: tm>0 ? (ts/tm)*100 : 0};
}
function classify(p){
  if(p>=75) return t('statusHigh');
  if(p>=50) return t('statusMid');
  return t('statusLow');
}

function finalize(){
  const r=computeResults(S.answers);
  const allZero=Object.values(S.answers).every(v=>v===0);
  if(allZero) toast(IS_AR?'يرجى التأكد من الإجابات':'Please verify answers',3200);
  S.assessment={results:r, date:today()};
  S.plan=genPlan(r);
  S.onboarded=true;
  save();
  renderResults(r);
  go('results');
  Snd.celebrate();
  setTimeout(confetti, 300);
   // ضمان التمرير لأعلى شاشة النتائج
  setTimeout(()=>window.scrollTo({top:0, behavior:'instant'}), 50);
}

/* ═══════════ 15. PLAN ═══════════ */
function genPlan(r){
  const sorted=Object.keys(r.subs).sort((a,b)=>r.subs[a]-r.subs[b]);
  const focus=sorted.slice(0,2);
  const startDate=today();
  const weeks=[];
  for(let w=0; w<4; w++){
    const fSub=focus[w%2];
    const all=ACTS[fSub]||[];
    const ageActs=all.filter(a=>S.child.age>=a.ag[0] && S.child.age<=a.ag[1]);
    const pool=ageActs.length?ageActs:all;
    const tasks=[];
    for(let d=0; d<7; d++){
      tasks.push({sub:fSub, ...pool[(w*7+d)%pool.length]});
    }
    weeks.push({focus:fSub, tasks});
  }
  return {weeks, startDate};
}
function getTodayActivity(){
  if(!S.plan) return null;
  const start=new Date(S.plan.startDate);
  const dayIdx=Math.floor((new Date()-start)/86400000);
  if(dayIdx<0) return null;
  const wIdx=Math.floor(dayIdx/7), dIdx=dayIdx%7;
  if(wIdx>=S.plan.weeks.length) return null;
  const task=S.plan.weeks[wIdx].tasks[dIdx];
  return task ? {...task, weekIdx:wIdx, dayInWeek:dIdx} : null;
}
function isDone(date, sub, titleKey){
  return S.logs.some(l=>l.date===date && l.sub===sub && (l.ta===titleKey || l.te===titleKey));
}
function isTodayDone(){
  const act=getTodayActivity(); if(!act) return false;
  return isDone(today(), act.sub, IS_AR?act.ta:act.te);
}

/* ═══════════ 16. STREAK ═══════════ */
function computeStreak(){
  if(!S.logs.length) return {current:0, longest:0};
  const dates=[...new Set(S.logs.map(l=>l.date))].sort();
  let longest=1, current=1;
  for(let i=1; i<dates.length; i++){
    const diff=daysDiff(dates[i-1], dates[i]);
    if(diff===1) current++;
    else { if(current>longest) longest=current; current=1; }
  }
  if(current>longest) longest=current;
  const last=dates[dates.length-1];
  if(daysDiff(last, today())>1) current=0;
  return {current, longest};
}

/* ═══════════ 17. RESULTS RENDER ═══════════ */
function renderResults(r){
  const pct=Math.round(r.overall);
  const circ=2*Math.PI*72;
  const offset=circ-(pct/100)*circ;
  const ring=$('#ringFg');
  ring.setAttribute('stroke-dasharray', circ);
  ring.setAttribute('stroke-dashoffset', circ);
  setTimeout(()=>ring.setAttribute('stroke-dashoffset', offset), 200);

  let n=0; const step=Math.max(1, Math.round(pct/30));
  const iv=setInterval(()=>{
    n=Math.min(n+step, pct);
    $('#overallPct').textContent=n+'%';
    if(n>=pct) clearInterval(iv);
  }, 30);
  $('#overallBadge').textContent=classify(pct);

  $('#domainResults').innerHTML=Object.keys(DOMAINS).map(k=>{
    const d=DOMAINS[k], v=Math.round(r.doms[k]||0);
    return `<div class="domain-row">
      <div class="ic" style="background:${d.grad}">${d.icon}</div>
      <div class="body">
        <h4>${IS_AR?d.ar:d.en} <span class="val" style="color:${d.color}">${v}%</span></h4>
        <div class="track"><div class="fill" style="background:${d.grad};width:0" data-w="${v}"></div></div>
      </div></div>`;
  }).join('');

  const sortedSubs=Object.keys(r.subs).sort((a,b)=>r.subs[b]-r.subs[a]);
  $('#subdomainResults').innerHTML=sortedSubs.map(k=>{
    const s=SUBDOMAINS[k], d=DOMAINS[s.domain], v=Math.round(r.subs[k]);
    return `<div class="domain-row">
      <div class="ic" style="background:${d.grad};font-size:20px">${s.icon}</div>
      <div class="body">
        <h4 style="font-size:13px">${IS_AR?s.ar:s.en} <span class="val" style="color:${d.color}">${v}%</span></h4>
        <div class="track"><div class="fill" style="background:${d.grad};width:0" data-w="${v}"></div></div>
      </div></div>`;
  }).join('');

  setTimeout(()=>$$('.domain-row .fill').forEach(f=>f.style.width=f.dataset.w+'%'), 300);
  updateCompanionButtonText();

  // Refresh companion button label after language known
  const sc = $('#startCompanion');
  if(sc) sc.textContent = '🚀 ' + t('resultsStartCompanion');
}

$('#startCompanion').addEventListener('click', ()=>{
  Snd.success();
  const dest = S.pendingDestination || 'home';
  S.pendingDestination = null;
  save();
  routeTo(dest);
});

/* ═══════════ 18. HOME RENDER ═══════════ */
function renderHome(){
  if(!S.child || !S.plan){ go('welcome'); return; }
  const h=new Date().getHours();
  $('#greetText').textContent = h<12 ? t('greetMorning') : h<18 ? t('greetAfternoon') : t('greetEvening');
  $('#childNameHome').textContent = S.child.name;
  const st=computeStreak();
  $('#streakNum').textContent = st.current;
  const todayMood=S.moods[today()];
  $$('#moodChips .mood-chip').forEach(b=>{
    b.classList.toggle('selected', todayMood && parseInt(b.dataset.m,10)===todayMood);
  });
  renderTodayCard();
  renderWeekProgress();
  $('#statActivities').textContent = S.logs.length;
  $('#statLongest').textContent = st.longest;
  const stats={total:S.logs.length, streak:st.current, assessed:true};
  $('#statAch').textContent = ACHS.filter(a=>a.check(stats)).length;
}
function renderTodayCard(){
  const act=getTodayActivity();
  const c=$('#todayCard');
  if(!act){
    c.innerHTML=`<div class="card" style="text-align:center;padding:30px"><div style="font-size:40px;margin-bottom:10px">🎉</div><h3>${t('toastAllDone')}</h3></div>`;
    return;
  }
  const dom=DOMAINS[SUBDOMAINS[act.sub].domain];
  const sub=SUBDOMAINS[act.sub];
  const done=isTodayDone();
  c.innerHTML=`
    <div class="today ${done?'done':''}">
      <div class="tag">${done?'✓':t('todayLbl')}</div>
      <div class="icon">${act.ic}</div>
      <h3>${IS_AR?act.ta:act.te}</h3>
      <p class="desc">${IS_AR?act.da:act.de}</p>
      <div class="tags">
        <span class="ti v">${dom.icon} ${IS_AR?sub.ar:sub.en}</span>
        <span class="ti c">⏱️ ${tObj(act.du)}</span>
        <span class="ti m">🔁 ${tObj(act.fr)}</span>
      </div>
      ${done ? `<div class="done-badge">${t('doneToday')}</div>` :
        `<div style="display:flex;gap:8px">
          <button class="btn light" style="flex:0 0 auto;padding:12px 18px" id="viewTodayBtn">${t('viewDetails')}</button>
          <button class="btn primary" style="flex:1" id="startTodayBtn">${t('startActivity')}</button>
        </div>`}
    </div>`;
  const vb=$('#viewTodayBtn'); if(vb) vb.addEventListener('click', openTodayDetail);
  const sb=$('#startTodayBtn'); if(sb) sb.addEventListener('click', openLog);
}
function renderWeekProgress(){
  const start=new Date(S.plan.startDate);
  const dayIdx=Math.floor((new Date()-start)/86400000);
  const wIdx=Math.floor(Math.max(dayIdx,0)/7);
  const week=S.plan.weeks[wIdx];
  if(!week){
    $('#weekLabel').textContent=t('weekDone');
    $('#weekPct').textContent='100%';
    $('#weekDots').innerHTML='';
    return;
  }
  $('#weekLabel').textContent=t('week'+(wIdx+1));
  const startWeek=new Date(start); startWeek.setDate(startWeek.getDate()+wIdx*7);
  let doneCount=0;
  const dots=[];
  for(let d=0; d<7; d++){
    const dt=new Date(startWeek); dt.setDate(dt.getDate()+d);
    const key=dt.toISOString().slice(0,10);
    const task=week.tasks[d];
    const taskDone=S.logs.some(l=>l.date===key && l.sub===task.sub && (l.ta===task.ta || l.te===task.te));
    if(taskDone) doneCount++;
    const isToday=key===today();
    const isFuture=dt>new Date();
    dots.push(`<div class="day-dot ${taskDone?'done':''} ${isToday?'today':''} ${isFuture?'future':''}">${isToday&&!taskDone?'•':''}</div>`);
  }
  $('#weekPct').textContent=Math.round((doneCount/7)*100)+'%';
  $('#weekDots').innerHTML=dots.join('');
}

/* ═══════════ 19. MOOD CHIPS ═══════════ */
$$('#moodChips .mood-chip').forEach(b=>b.addEventListener('click', ()=>{
  const m=parseInt(b.dataset.m,10);
  S.moods[today()]=m;
  $$('#moodChips .mood-chip').forEach(x=>x.classList.remove('selected'));
  b.classList.add('selected');
  save(); Snd.tap(); vib([8,30,8]);
  toast(t('toastMood'));
}));

/* ═══════════ 20. TODAY DETAIL ═══════════ */
function openTodayDetail(){
  const act=getTodayActivity(); if(!act) return;
  const dom=DOMAINS[SUBDOMAINS[act.sub].domain];
  const sub=SUBDOMAINS[act.sub];
  const done=isTodayDone();
  $('#todayDetail').innerHTML=`
    <div class="hero" style="text-align:start">
      <div class="badge" style="margin-bottom:14px">${dom.icon} ${IS_AR?sub.ar:sub.en}</div>
      <div style="font-size:52px;margin-bottom:10px">${act.ic}</div>
      <h2 style="font-size:22px;font-weight:900;margin-bottom:8px">${IS_AR?act.ta:act.te}</h2>
      <p style="font-size:14px;opacity:.9;line-height:1.6">${IS_AR?act.da:act.de}</p>
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:14px">
        <span style="padding:7px 12px;border-radius:99px;background:rgba(255,255,255,.15);font-size:12px;font-weight:800">⏱️ ${tObj(act.du)}</span>
        <span style="padding:7px 12px;border-radius:99px;background:rgba(255,255,255,.15);font-size:12px;font-weight:800">🔁 ${tObj(act.fr)}</span>
      </div>
    </div>
    <div class="card"><h3 style="font-size:15px">${t('watchFor')}</h3><p style="color:var(--t2)">${IS_AR?act.wa:act.we}</p></div>
    <div class="card"><h3 style="font-size:15px">${t('tips')}</h3>
      <ul style="font-size:13.5px;color:var(--t2);line-height:1.8;padding-inline-start:20px">
        <li>${t('tips1')}</li><li>${t('tips2')}</li><li>${t('tips3')}</li>
      </ul>
    </div>
    ${done ? `<div class="card gradient" style="text-align:center"><h3>${t('activityDone')}</h3></div>` :
      `<button class="btn primary mt" id="logTodayBtn">${t('startActivity')}</button>`}
    <button class="btn ghost mt" id="backHomeBtn">${t('backHome')}</button>`;
  const lb=$('#logTodayBtn'); if(lb) lb.addEventListener('click', openLog);
  $('#backHomeBtn').addEventListener('click', ()=>go('home'));
  go('today');
}

/* ═══════════ 21. ACTIVITIES LIBRARY ═══════════ */
let actFilter='all';
$$('#actFilters .chip').forEach(c=>c.addEventListener('click', ()=>{
  $$('#actFilters .chip').forEach(x=>x.classList.remove('active'));
  c.classList.add('active'); actFilter=c.dataset.f; renderActivities(); Snd.tap();
}));
function renderActivities(){
  if(!S.child) return;
  const items=[];
  Object.keys(ACTS).forEach(sk=>{
    const sub=SUBDOMAINS[sk];
    if(actFilter!=='all' && sub.domain!==actFilter) return;
    ACTS[sk].forEach(a=>{
      const ageFit = S.child.age>=a.ag[0] && S.child.age<=a.ag[1];
      const done=S.logs.some(l=>l.sub===sk && (l.ta===a.ta || l.te===a.te));
      items.push({sk, sub, ...a, done, ageFit});
    });
  });
  // الأنشطة المناسبة للعمر أولاً
  items.sort((a,b)=>(b.ageFit?1:0)-(a.ageFit?1:0));
  if(!items.length){
    $('#actsList').innerHTML=`<div class="card" style="text-align:center;padding:30px;color:var(--t3)">${t('actsEmpty')}</div>`;
    return;
  }
  $('#actsList').innerHTML=items.map(a=>`
    <div class="act-card ${a.done?'done':''}" data-sk="${a.sk}" data-tar="${a.ta}">
      <div class="ic">${a.ic}</div>
      <div class="body">
        <div class="dom">${DOMAINS[a.sub.domain].icon} ${IS_AR?a.sub.ar:a.sub.en}</div>
        <h5>${IS_AR?a.ta:a.te}</h5>
        <p>${IS_AR?a.da:a.de}</p>
        <div style="margin-top:6px;display:flex;gap:5px;flex-wrap:wrap">
          <span style="font-size:10.5px;font-weight:800;padding:3px 8px;border-radius:99px;background:${a.ageFit?'#D9F9EE':'var(--bg2)'};color:${a.ageFit?'#059669':'var(--t3)'}">
            ${a.ageFit?'✓ '+(IS_AR?'مناسب':'Fits'):(IS_AR?'مُتقدّم':'Advanced')} ${a.ag[0]}-${a.ag[1]}
          </span>
        </div>
      </div>
      <div class="chk"></div>
    </div>`).join('');
  $$('#actsList .act-card').forEach(el=>el.addEventListener('click', ()=>{
    const sk=el.dataset.sk, tar=el.dataset.tar;
    const a=ACTS[sk].find(x=>x.ta===tar);
    if(a) showActivity(sk, a);
  }));
}
/* ═══════════ دالة عرض تفاصيل النشاط (مشتركة) ═══════════ */
function renderActivityDetail(act, subKey, options){
  options = options || {};
  const dom=DOMAINS[SUBDOMAINS[subKey].domain];
  const sub=SUBDOMAINS[subKey];
  const done = options.done;
  const fromLibrary = options.fromLibrary;

  const skill = act.sk ? tObj(act.sk) : null;
  const need  = act.nb ? tObj(act.nb) : null;
  const materials = act.ma ? tObj(act.ma) : null;
  const steps = act.st ? (act.st[LANG] || act.st.ar || []) : [];
  const story = act.story ? (act.story[LANG] || act.story.ar) : null;
  const pRole = act.pd ? tObj(act.pd) : null;

  const backLabel = fromLibrary ? ('← ' + t('actsTitle')) : t('backHome');

  $('#todayDetail').innerHTML = `
    <div class="hero" style="text-align:start">
      <div class="badge" style="margin-bottom:14px">${dom.icon} ${IS_AR?sub.ar:sub.en}</div>
      <div style="font-size:52px;margin-bottom:10px">${act.ic}</div>
      <h2 style="font-size:22px;font-weight:900;margin-bottom:8px">${IS_AR?act.ta:act.te}</h2>
      <p style="font-size:14px;opacity:.9;line-height:1.6">${IS_AR?act.da:act.de}</p>
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:14px">
        <span style="padding:7px 12px;border-radius:99px;background:rgba(255,255,255,.15);font-size:12px;font-weight:800">⏱️ ${tObj(act.du)}</span>
        <span style="padding:7px 12px;border-radius:99px;background:rgba(255,255,255,.15);font-size:12px;font-weight:800">🔁 ${tObj(act.fr)}</span>
      </div>
    </div>

    ${skill || need ? `
    <div class="card" style="padding:16px">
      ${skill ? `<div style="margin-bottom:${need?'10px':'0'}">
        <div class="detail-label">${IS_AR?'المهارة المستهدفة':'Target Skill'}</div>
        <div style="font-size:14px;font-weight:700;color:var(--t);margin-top:4px">${skill}</div>
      </div>` : ''}
      ${need ? `<div>
        <div class="detail-label">${IS_AR?'الحاجة المستهدفة':'Target Need'}</div>
        <div style="font-size:13.5px;color:var(--t2);margin-top:4px;line-height:1.6">${need}</div>
      </div>` : ''}
    </div>` : ''}

    ${materials ? `
    <div class="card">
      <h3 style="font-size:15px">🧰 ${IS_AR?'المواد المطلوبة':'Materials'}</h3>
      <p style="color:var(--t2);font-size:14px;line-height:1.7;margin-top:8px">${materials}</p>
    </div>` : ''}

    ${story ? `
    <div class="card story-card">
      <h3 style="font-size:15px;margin-bottom:10px">📖 ${IS_AR?'القصة':'Story'}</h3>
      <div class="story-body">${story}</div>
    </div>` : ''}

    ${steps.length ? `
    <div class="card">
      <h3 style="font-size:15px">📋 ${IS_AR?'خطوات التنفيذ':'Steps'}</h3>
      <ol class="steps-list">
        ${steps.map(s=>`<li>${s}</li>`).join('')}
      </ol>
    </div>` : ''}

    <div class="card">
      <h3 style="font-size:15px">👀 ${IS_AR?'ما الذي تراقبه؟':'What to watch for'}</h3>
      <p style="color:var(--t2);font-size:14px;margin-top:8px">${IS_AR?act.wa:act.we}</p>
    </div>

    ${pRole ? `
    <div class="card parent-role-card">
      <h3 style="font-size:15px">👨‍👩‍👧 ${IS_AR?'دور الوالد':'Parent\'s Role'}</h3>
      <p style="font-size:13.5px;line-height:1.7;margin-top:8px">${pRole}</p>
    </div>` : ''}

    <div class="card">
      <h3 style="font-size:15px">💡 ${IS_AR?'نصائح للتنفيذ':'Tips'}</h3>
      <ul class="tips-list">
        <li>${t('tips1')}</li>
        <li>${t('tips2')}</li>
        <li>${t('tips3')}</li>
      </ul>
    </div>

    ${act.src ? `
    <div class="card source-card">
      <div class="detail-label">${IS_AR?'المصدر العلمي':'Scientific Source'}</div>
      <div style="font-size:12.5px;color:var(--t2);margin-top:4px">${act.src}</div>
    </div>` : ''}

    ${done
      ? `<div class="card gradient" style="text-align:center"><h3>${t('activityDone')}</h3></div>`
      : `<button class="btn primary mt" id="logDetailBtn">${fromLibrary ? t('logThis') : t('startActivity')}</button>`}

    <button class="btn ghost mt" id="backDetailBtn">${backLabel}</button>`;

  const lb = $('#logDetailBtn');
  if(lb) lb.addEventListener('click', ()=>{
    if(fromLibrary) openLog(subKey, act);
    else openLog();
  });
  $('#backDetailBtn').addEventListener('click', ()=>{
    if(fromLibrary) go('activities');
    else go('home');
  });
  go('today');
}

/* ═══════════ openTodayDetail ═══════════ */
function openTodayDetail(){
  const act = getTodayActivity();
  if(!act) return;
  renderActivityDetail(act, act.sub, { done: isTodayDone(), fromLibrary: false });
}

/* ═══════════ showActivity (للمكتبة) ═══════════ */
function showActivity(sk, a){
  const done = S.logs.some(l => l.sub===sk && (l.ta===a.ta || l.te===a.te));
  renderActivityDetail(a, sk, { done, fromLibrary: true });
}
/* ═══════════ 22. LOG MODAL ═══════════ */
let logState={mood:null, note:'', custom:null};
function openLog(sk, a){
  let act, subKey;
  if(sk && a){ act=a; subKey=sk; logState.custom={sk, a}; }
  else { act=getTodayActivity(); if(!act){ toast(t('toastAllDone')); return; } subKey=act.sub; logState.custom=null; }
  logState.mood=null; logState.note='';
  $('#logActivityName').textContent = IS_AR?act.ta:act.te;
  $$('#logMoodRow .mood-opt').forEach(b=>b.classList.remove('selected'));
  $('#logNote').value='';
  $('#logModal').classList.add('visible');
}
/* Single binding for navCenter */
$('#navCenter').addEventListener('click', ()=>{ Snd.tap(); openLog(); });

$$('#logMoodRow .mood-opt').forEach(b=>b.addEventListener('click', ()=>{
  $$('#logMoodRow .mood-opt').forEach(x=>x.classList.remove('selected'));
  b.classList.add('selected'); logState.mood=parseInt(b.dataset.m,10); Snd.tap();
}));
$('#cancelLog').addEventListener('click', ()=>$('#logModal').classList.remove('visible'));
$('#logNote').addEventListener('input', e=>logState.note=e.target.value);

$('#confirmLog').addEventListener('click', ()=>{
  if(!logState.mood){ toast(t('toastChooseMood')); return; }
  let sk, act;
  if(logState.custom){ sk=logState.custom.sk; act=logState.custom.a; }
  else { act=getTodayActivity(); if(!act) return; sk=act.sub; }
  const oldStreak=computeStreak().current;
  const existing=S.logs.find(l=>l.date===today() && l.sub===sk && (l.ta===act.ta || l.te===act.te));
  if(existing){ existing.mood=logState.mood; existing.note=logState.note; }
  else {
    S.logs.push({
      date:today(), sub:sk, ta:act.ta, te:act.te, ic:act.ic,
      mood:logState.mood, note:logState.note, ts:Date.now()
    });
  }
  save();
  $('#logModal').classList.remove('visible');
  Snd.celebrate(); confetti();
  const newStreak=computeStreak().current;
  setTimeout(()=>{
    if(newStreak>oldStreak && newStreak>=3) toast(t('toastStreak')+' '+newStreak);
    else toast(t('toastSaved'));
  }, 300);
  renderHome();
  const cur=currentScreen();
  if(cur==='today') openTodayDetail();
  if(cur==='activities') renderActivities();
});

/* ═══════════ 23. PROGRESS ═══════════ */
function renderProgress(){
  const st=computeStreak();
  $('#progressStreak').textContent=st.current;
  $('#progressSub').textContent = st.current===0 ? t('progStart')
    : st.current<3 ? t('progGreat')
    : st.current<7 ? t('progGood')
    : t('progChamp');
  const todayD=new Date();
  const days=[];
  for(let i=6; i>=0; i--){
    const d=new Date(todayD); d.setDate(d.getDate()-i);
    const key=d.toISOString().slice(0,10);
    const count=S.logs.filter(l=>l.date===key).length;
    days.push({key, d, count, isToday: i===0});
  }
  const max=Math.max(1, ...days.map(x=>x.count));
  const dayNames = IS_AR ? ['أحد','اثنين','ثلاثاء','أربعاء','خميس','جمعة','سبت'] : ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  $('#weeklyChart').innerHTML=days.map(x=>`
    <div class="bar-col ${x.isToday?'today':''}">
      <div class="wrap"><div class="fill" style="height:${(x.count/max)*100}%"></div></div>
      <div class="day">${dayNames[x.d.getDay()]}</div>
    </div>`).join('');
  const stats={total:S.logs.length, streak:st.current, assessed:true};
  $('#achGrid').innerHTML=ACHS.map(a=>{
    const unlocked=a.check(stats);
    return `<div class="ach ${unlocked?'unlocked':'locked'}">
      <div class="em">${a.icon}</div>
      <div class="nm">${a.name[LANG]}</div>
    </div>`;
  }).join('');
}

/* ═══════════ 24. PROFILE ═══════════ */
function renderProfile(){
  if(!S.child) return;
  $('#profileAvatar').textContent = S.child.gender==='female' ? '👧' : '👦';
  $('#profileName').textContent = S.child.name;
  const st=computeStreak();
  $('#profileMeta').textContent = `${S.child.age} ${IS_AR?'سنوات':'yrs'} · ${S.logs.length} ${IS_AR?'نشاط':'acts'} · ${st.current} ${IS_AR?'يوم':'days'}`;
  $('#soundToggle').textContent = S.sound ? (IS_AR?'مفعّل ✓':'ON ✓') : (IS_AR?'مغلق':'OFF');
  $('#soundToggle').classList.toggle('on', S.sound);
  $('#versionText').textContent = '1.5.0';
  applyTheme();
}
$('#darkToggle').addEventListener('click', ()=>{
  S.theme = S.theme==='dark' ? 'light' : 'dark'; save(); applyTheme(); Snd.click();
});
$('#soundToggle').addEventListener('click', ()=>{
  S.sound=!S.sound; save(); renderProfile(); if(S.sound) Snd.click();
});
$('#reassessRow').addEventListener('click', ()=>{
  if(!confirm(t('confirmReassess'))) return;
  S.answers={}; S.qIdx=0;
  S.plan=null; S.onboarded=false;   // ← FIX: clear plan & onboarded
  save();
  go('child'); Snd.click();
});
$('#resetRow').addEventListener('click', ()=>{
  if(!confirm(t('confirmReset'))) return;
  S=JSON.parse(JSON.stringify(DEF)); save(); applyTheme(); go('welcome');
});
/* ═══════════ ربط بطاقات الترحيب ═══════════ */
function wireWelcomeCards(){
  document.querySelectorAll('#screen-welcome .welcome-card').forEach(card => {
    card.addEventListener('click', () => {
      const target = card.dataset.goto;
      if(!target) return;
      Snd.click(); vib(8);

      const assessmentDone = !!(S.onboarded && S.child && S.plan && S.assessment);
      if(!assessmentDone){
        // احفظ الوجهة المقصودة، ثم ابدأ الاختبار
        S.pendingDestination = target;
        save();
        // إذا كان لديه معلومات الطفل محفوظة، اذهب مباشرة للأسئلة
        if(S.child && S.child.age){
          S.answers={}; S.qIdx=0; save();
          go('questions'); renderQuestion();
        } else {
          go('child');
        }
        return;
      }
      routeTo(target);
    });
  });
}

function routeTo(target){
  switch(target){
    case 'child':      go('child'); break;
    case 'activities': renderActivities(); go('activities'); break;
    case 'progress':   renderProgress();   go('progress');   break;
    case 'home':       renderHome();       go('home');       break;
    case 'profile':    renderProfile();    go('profile');    break;
    default:           renderHome();       go('home');
  }
}
/* ═══════════ 25. BOOT ═══════════ */
function boot(){
  load();
  applyTheme();
  applyStaticI18n();
  wireWelcomeCards();
  if(S.onboarded && S.child && S.plan){ renderHome(); go('home'); }
  else go('welcome');
}
document.addEventListener('DOMContentLoaded', boot);
document.addEventListener('click', ()=>Snd.unlock(), {once:true});

})();
