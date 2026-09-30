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
'emo-awareness':[
  {ic:'📖',du:{ar:'5 د',en:'5 min'},fr:{ar:'يوميًا',en:'Daily'},ag:[3,5],
   ta:'قاموس المشاعر اليومي',te:'Daily Emotions Dictionary',
   da:'بطاقات وجوه للمشاعر، يختار الطفل وجهه الحالي ويسميه بكلمة.',de:'Emotion face cards; child picks and names their current feeling.',
   wa:'هل يستبدل الصراخ بالتسمية اللفظية؟',we:'Does he replace screaming with naming?'},
  {ic:'📚',du:{ar:'10 د',en:'10 min'},fr:{ar:'3×أسبوعيًا',en:'3×/week'},ag:[5,7],
   ta:'قصة بطلي والموقف المفاجئ',te:'My Upset Hero Story',
   da:'قراءة قصة والتوقف عند شخصية منزعجة لربط السبب بالشعور.',de:'Read a story and pause at an upset character to link cause to feeling.',
   wa:'هل يربط السبب بالنتيجة؟',we:'Does he link cause to feeling?'},
  {ic:'🌤️',du:{ar:'5 د',en:'5 min'},fr:{ar:'عند الحاجة',en:'As needed'},ag:[7,12],
   ta:'لوحة الطقس الداخلي',te:'Inner Weather Board',
   da:'تشبيه الحالة الداخلية بالطقس: مشمس/غائم/عاصف.',de:'Compare inner state to weather: sunny/cloudy/stormy.',
   wa:'هل يستخدم مفردات دقيقة؟',we:'Does he use precise words?'}
],
'emo-regulation':[
  {ic:'🧘',du:{ar:'5-10 د',en:'5-10 min'},fr:{ar:'عند التوتر',en:'When stressed'},ag:[5,7],
   ta:'ركن التنفس والتهدئة',te:'Breathing Calm Corner',
   da:'مساحة هادئة بوسادة، يتنفس الطفل 3 أنفاس بطيئة.',de:'Calm space with a pillow; child takes 3 slow breaths.',
   wa:'هل يقبل الابتعاد للتهدئة؟',we:'Does he accept stepping away?'},
  {ic:'🤗',du:{ar:'3-5 د',en:'3-5 min'},fr:{ar:'عند الضيق',en:'When upset'},ag:[3,5],
   ta:'عناق التهدئة المشتركة',te:'Co-regulation Hug',
   da:'احتضان هادئ مع صوت منخفض: "أنا بجانبك".',de:'Gentle hug with a low voice: "I am here with you".',
   wa:'هل تنخفض حدة البكاء؟',we:'Does crying intensity decrease?'},
  {ic:'🌉',du:{ar:'15 د',en:'15 min'},fr:{ar:'2×أسبوعيًا',en:'2×/week'},ag:[7,12],
   ta:'إعادة بناء الجسر',te:'Rebuild the Bridge',
   da:'بناء مجسم؛ عند سقوطه، استراحة قصيرة ثم محاولة جديدة.',de:'Build a model; when it falls, brief break then retry.',
   wa:'هل يعود للمهمة بعد الإحباط؟',we:'Does he return to task after frustration?'}
],
'emo-empathy':[
  {ic:'🎁',du:{ar:'2 د',en:'2 min'},fr:{ar:'عند البكاء',en:'When crying'},ag:[3,5],
   ta:'صندوق المواساة',te:'Comfort Box',
   da:'صندوق بلعبة محشوة ومنديل؛ يقدمه الطفل لمن يبكي.',de:'Box with a stuffed toy and tissue; child offers it to one crying.',
   wa:'هل يبادر بتقديم غرض التهدئة؟',we:'Does he initiate offering comfort?'},
  {ic:'🎭',du:{ar:'10 د',en:'10 min'},fr:{ar:'2×أسبوعيًا',en:'2×/week'},ag:[3,6],
   ta:'محقق الاطمئنان اللفظي',te:'Empathy Detective',
   da:'تمثيل أدوار بالعرائس لصياغة جمل الدعم.',de:'Puppet role-play to practice supportive phrases.',
   wa:'هل يسأل تلقائيًا عن حال الآخرين؟',we:'Does he ask about others automatically?'},
  {ic:'🤫',du:{ar:'30-60 د',en:'30-60 min'},fr:{ar:'عند المرض',en:'When sick'},ag:[7,12],
   ta:'ساعة الهدوء الأسرية',te:'Family Quiet Hour',
   da:'الاتفاق على نشاط همس مراعاةً لمريض.',de:'Agree on a whisper activity out of care for a sick member.',
   wa:'هل يخفض صوته تلقائيًا؟',we:'Does he lower his voice automatically?'}
],
'cog-memory':[
  {ic:'🎒',du:{ar:'10 د',en:'10 min'},fr:{ar:'3×أسبوعيًا',en:'3×/week'},ag:[5,7],
   ta:'حقيبة السفر الذهنية',te:'Mental Suitcase',
   da:'لعبة "حزمت في حقيبتي..." مع إضافة أغراض متسلسلة.',de:'"I packed in my suitcase..." game adding items sequentially.',
   wa:'هل يتذكر التسلسل؟',we:'Does he recall the sequence?'},
  {ic:'👨‍🍳',du:{ar:'15 د',en:'15 min'},fr:{ar:'2×أسبوعيًا',en:'2×/week'},ag:[3,5],
   ta:'الطاهي الصغير',te:'Little Chef',
   da:'تنفيذ وصفة من 3 خطوات دون تكرار مستمر.',de:'Follow a 3-step recipe without repetitive instructions.',
   wa:'هل ينفذ الخطوة التالية تلقائيًا؟',we:'Does he do the next step automatically?'},
  {ic:'🎴',du:{ar:'10 د',en:'10 min'},fr:{ar:'3×أسبوعيًا',en:'3×/week'},ag:[5,7],
   ta:'البحث عن المطابقات',te:'Memory Match',
   da:'لعبة الذاكرة ببطاقات مقلوبة لبناء خريطة ذهنية.',de:'Memory cards to build a mental map of positions.',
   wa:'هل تقل الأخطاء العشوائية؟',we:'Do errors decrease?'},
  {ic:'🧩',du:{ar:'15 د',en:'15 min'},fr:{ar:'2×أسبوعيًا',en:'2×/week'},ag:[7,12],
   ta:'لغز المراحل الثلاث',te:'Three-Step Puzzle',
   da:'حل مهمة متعددة الخطوات مع تتبع الخطة.',de:'Solve a multi-step task while tracking the plan.',
   wa:'هل يحافظ على التسلسل؟',we:'Does he keep the sequence?'}
],
'cog-flex':[
  {ic:'🔀',du:{ar:'10 د',en:'10 min'},fr:{ar:'3×أسبوعيًا',en:'3×/week'},ag:[3,5],
   ta:'التصنيف المقلوب',te:'Silly Sorting',
   da:'تصنيف المكعبات حسب اللون، ثم تغيير القاعدة فجأة للحجم.',de:'Sort blocks by color, then switch to size.',
   wa:'هل ينتقل بسلاسة للقاعدة الجديدة؟',we:'Does he transition smoothly?'},
  {ic:'📋',du:{ar:'10 د',en:'10 min'},fr:{ar:'أسبوعيًا',en:'Weekly'},ag:[5,8],
   ta:'خطة (ب) الممتعة',te:'Plan B Game',
   da:'رسم خطة أساسية وخطة بديلة للأنشطة.',de:'Draw main and alternative plans for activities.',
   wa:'هل يتقبل البديل دون مقاومة؟',we:'Does he accept the alternative?'},
  {ic:'🎯',du:{ar:'15 د',en:'15 min'},fr:{ar:'2×أسبوعيًا',en:'2×/week'},ag:[7,12],
   ta:'لغز الطرق البديلة',te:'Alternative Paths Puzzle',
   da:'منع تكرار نفس المحاولة وإلزام الطفل بتجربة أفكار جديدة.',de:'Prevent retrying the same attempt; force new ideas.',
   wa:'هل يجرب طرقًا جديدة؟',we:'Does he try new approaches?'}
],
'cog-reason':[
  {ic:'🔬',du:{ar:'15 د',en:'15 min'},fr:{ar:'أسبوعيًا',en:'Weekly'},ag:[3,6],
   ta:'المكتشف الصغير',te:'Little Discoverer',
   da:'تجربة طفو/غرق الأغراض وسؤال "لماذا؟".',de:'Float/sink experiment asking "why?".',
   wa:'هل يقدم تبريرات منطقية؟',we:'Does he give logical reasons?'},
  {ic:'🧠',du:{ar:'10 د',en:'10 min'},fr:{ar:'2×أسبوعيًا',en:'2×/week'},ag:[5,8],
   ta:'ماذا يعلم صديقي؟',te:'What Does My Friend Know?',
   da:'نقل شيء دون علم الأخ، ثم السؤال: أين سيبحث؟',de:'Move an object without the sibling knowing; where will they look?',
   wa:'هل يدرك أن الآخر لا يعلم؟',we:"Does he realize others don't know?"},
  {ic:'⚖️',du:{ar:'5 د',en:'5 min'},fr:{ar:'عند الاختيار',en:'When choosing'},ag:[7,12],
   ta:'ميزان القرار اليومي',te:'Decision Balance',
   da:'طلب دليلين منطقيين لترجيح خيار.',de:'Ask for two logical reasons supporting a choice.',
   wa:'هل يقدم حججًا متماسكة؟',we:'Does he provide coherent arguments?'}
],
'beh-inhibit':[
  {ic:'🧊',du:{ar:'10 د',en:'10 min'},fr:{ar:'3×أسبوعيًا',en:'3×/week'},ag:[3,6],
   ta:'التمثال المجمد',te:'Freeze Dance',
   da:'الرقص مع الموسيقى والتجمد فورًا عند توقفها.',de:'Dance with music; freeze instantly when it stops.',
   wa:'هل يكبح جسده فورًا؟',we:'Does he freeze instantly?'},
  {ic:'🚦',du:{ar:'10 د',en:'10 min'},fr:{ar:'3×أسبوعيًا',en:'3×/week'},ag:[5,9],
   ta:'إشارة المرور المنزلية',te:'Home Traffic Light',
   da:'بطاقات ملونة للجري والمشي والتوقف.',de:'Colored cards for run, walk, and stop.',
   wa:'هل يتوقف عند الأحمر؟',we:'Does he stop on red?'},
  {ic:'✨',du:{ar:'10 د',en:'10 min'},fr:{ar:'3×أسبوعيًا',en:'3×/week'},ag:[5,9],
   ta:'الكلمة السحرية',te:'Magic Word (Simon Says)',
   da:'لا ينفذ إلا إذا سبقت التعليمات بالكلمة السحرية.',de:'Only act if the magic word precedes the instruction.',
   wa:'هل يتريث قبل الحركة؟',we:'Does he pause before acting?'}
],
'beh-routine':[
  {ic:'📅',du:{ar:'مستمر',en:'Ongoing'},fr:{ar:'يوميًا',en:'Daily'},ag:[5,9],
   ta:'لوحة محطات اليوم المصورة',te:'Day Stations Board',
   da:'لوحة بصور متتابعة لروتين العودة مع علامة صح.',de:'Board with sequential return-routine images with checkmarks.',
   wa:'هل ينتقل بين المحطات باعتياد؟',we:'Does he transition habitually?'},
  {ic:'⏱️',du:{ar:'5 د',en:'5 min'},fr:{ar:'يوميًا',en:'Daily'},ag:[7,12],
   ta:'تحدي 5 دقائق',te:'5-Minute Challenge',
   da:'مؤقت ونغمة حماسية لإعادة الألعاب لمواضعها.',de:'Timer with energetic tone to return toys before it rings.',
   wa:'هل يستجيب بسرعة؟',we:'Does he respond quickly?'},
  {ic:'🎒',du:{ar:'10 د',en:'10 min'},fr:{ar:'يوميًا',en:'Daily'},ag:[7,12],
   ta:'محطة الاستعداد للغد',te:'Tomorrow Prep Station',
   da:'تجهيز الأدوات والحقيبة مساءً عند مخرج البيت.',de:'Prepare tools and bag in the evening at the exit.',
   wa:'هل يخرج الصباح بسلاسة؟',we:'Does the morning flow smoothly?'}
],
'skl-comm':[
  {ic:'📖',du:{ar:'10-15 د',en:'10-15 min'},fr:{ar:'يوميًا',en:'Daily'},ag:[3,6],
   ta:'القراءة الحوارية المتبادلة',te:'Dialogic Reading',
   da:'قراءة كتاب مصور مع أسئلة مفتوحة وتوسيع جمل الطفل.',de:"Read a picture book with open questions; expand child's sentences.",
   wa:'هل تزداد طول جملته؟',we:'Does his sentence length grow?'},
  {ic:'🎤',du:{ar:'10 د',en:'10 min'},fr:{ar:'3×أسبوعيًا',en:'3×/week'},ag:[5,9],
   ta:'مقابلة المذيع',te:'Talk Show Interview',
   da:'ميكروفون لعبة؛ لا يتكلم إلا حامله مع النظر للمتحدث.',de:'Toy microphone; only the holder speaks, looking at the other.',
   wa:'هل ينتظر دوره وينظر للمتحدث؟',we:'Does he wait his turn and look at the speaker?'},
  {ic:'❓',du:{ar:'10 د',en:'10 min'},fr:{ar:'2×أسبوعيًا',en:'2×/week'},ag:[7,12],
   ta:'مراسل الاستفسار',te:'Curious Reporter',
   da:'تعليمات غامضة قصدًا وتشجيع الطفل على السؤال.',de:'Deliberately vague instructions; encourage child to ask.',
   wa:'هل يطرح أسئلة استفسارية؟',we:'Does he ask clarifying questions?'}
],
'skl-social':[
  {ic:'⏳',du:{ar:'15 د',en:'15 min'},fr:{ar:'عند اللعب',en:'During play'},ag:[3,6],
   ta:'عداد التناوب',te:'Turn Timer',
   da:'مؤقت رملي دقيقتان للتبادل بين الأطفال.',de:'Two-minute sand timer to alternate between children.',
   wa:'هل يسلّم اللعبة بهدوء؟',we:'Does he hand over calmly?'},
  {ic:'🌉',du:{ar:'5 د',en:'5 min'},fr:{ar:'عند النزاع',en:'During conflict'},ag:[5,9],
   ta:'جسور الحلول الوسطى',te:'Solutions Bridge',
   da:'بطاقة حلول لسؤال الطرفين عن حل يرضيهما معًا.',de:'Solutions card to ask both parties for a mutually acceptable fix.',
   wa:'هل يقترح حلولًا وسيطة؟',we:'Does he suggest solutions?'},
  {ic:'🏗️',du:{ar:'30 د',en:'30 min'},fr:{ar:'أسبوعيًا',en:'Weekly'},ag:[7,12],
   ta:'مشروع البناء الجماعي',te:'Team Build Project',
   da:'بناء مدينة من الوسائد مع توزيع أدوار.',de:'Build a pillow city with assigned roles.',
   wa:'هل يلتزم بدوره ويتعاون؟',we:'Does he stick to his role and cooperate?'}
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
const DEF={theme:'light',sound:true,onboarded:false,child:null,assessment:null,plan:null,logs:[],moods:{},answers:{},qIdx:0};
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
const NAV_SCREENS=['home','activities','progress','profile'];

function go(screen){
  $$('.screen').forEach(s=>s.classList.remove('active'));
  const el=document.getElementById('screen-'+screen);
  if(el) el.classList.add('active');
  const titleFn=TITLES[screen]; if(titleFn) $('#topTitle').textContent=titleFn();
  $('#topbar').classList.toggle('dark', DARK_SCREENS.includes(screen));
  const showBack=['child','questions','today'].includes(screen);
  $('#backBtn').classList.toggle('hidden', !showBack);
  const showNav=NAV_SCREENS.includes(screen);
  $('#nav').classList.toggle('visible', showNav);
  document.body.classList.toggle('nav-visible', showNav);
  if(showNav){
    $$('#nav button[data-go]').forEach(b=>b.classList.toggle('active', b.dataset.go===screen));
  }
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

/* ═══════════ 10.b APPLY STATIC I18N ═══════════ */
function applyStaticI18n(){
  // Welcome title (h1)
  const wt = document.querySelector('#screen-welcome h1');
  if(wt) wt.textContent = t('welcomeTitle');
  // Streak label
  const sl = document.querySelector('.streak .lbl');
  if(sl) sl.textContent = t('homeDay');
  // Start companion button
  const sc = $('#startCompanion');
  if(sc) sc.textContent = '🚀 ' + t('resultsStartCompanion');
  // Results ring label
  const rl = document.querySelector('.ring .lbl');
  if(rl) rl.textContent = t('resultsScoreLbl');
  // Next button initial
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

  // Refresh companion button label after language known
  const sc = $('#startCompanion');
  if(sc) sc.textContent = '🚀 ' + t('resultsStartCompanion');
}

$('#startCompanion').addEventListener('click', ()=>{
  Snd.success(); renderHome(); go('home');
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
      if(S.child.age<a.ag[0] || S.child.age>a.ag[1]) return;
      const done=S.logs.some(l=>l.sub===sk && (l.ta===a.ta || l.te===a.te));
      items.push({sk, sub, ...a, done});
    });
  });
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
      </div>
      <div class="chk"></div>
    </div>`).join('');
  $$('#actsList .act-card').forEach(el=>el.addEventListener('click', ()=>{
    const sk=el.dataset.sk, tar=el.dataset.tar;
    const a=ACTS[sk].find(x=>x.ta===tar);
    if(a) showActivity(sk, a);
  }));
}
function showActivity(sk, a){
  const dom=DOMAINS[SUBDOMAINS[sk].domain];
  const sub=SUBDOMAINS[sk];
  const done=S.logs.some(l=>l.sub===sk && (l.ta===a.ta || l.te===a.te));
  $('#todayDetail').innerHTML=`
    <div class="hero" style="text-align:start">
      <div class="badge" style="margin-bottom:14px">${dom.icon} ${IS_AR?sub.ar:sub.en}</div>
      <div style="font-size:52px;margin-bottom:10px">${a.ic}</div>
      <h2 style="font-size:22px;font-weight:900;margin-bottom:8px">${IS_AR?a.ta:a.te}</h2>
      <p style="font-size:14px;opacity:.9;line-height:1.6">${IS_AR?a.da:a.de}</p>
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:14px">
        <span style="padding:7px 12px;border-radius:99px;background:rgba(255,255,255,.15);font-size:12px;font-weight:800">⏱️ ${tObj(a.du)}</span>
        <span style="padding:7px 12px;border-radius:99px;background:rgba(255,255,255,.15);font-size:12px;font-weight:800">🔁 ${tObj(a.fr)}</span>
      </div>
    </div>
    <div class="card"><h3 style="font-size:15px">${t('watchFor')}</h3><p style="color:var(--t2)">${IS_AR?a.wa:a.we}</p></div>
    ${done ? `<div class="card gradient" style="text-align:center"><h3>${t('activityDone')}</h3></div>` :
      `<button class="btn primary mt" id="logCustomBtn">${t('logThis')}</button>`}
    <button class="btn ghost mt" id="backLibBtn">← ${t('actsTitle')}</button>`;
  const lb=$('#logCustomBtn'); if(lb) lb.addEventListener('click', ()=>openLog(sk, a));
  $('#backLibBtn').addEventListener('click', ()=>go('activities'));
  go('today');
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

/* ═══════════ 25. BOOT ═══════════ */
function boot(){
  load();
  applyTheme();
  applyStaticI18n();          // ← FIX: fill static i18n placeholders
  if(S.onboarded && S.child && S.plan){ renderHome(); go('home'); }
  else go('welcome');
}
document.addEventListener('DOMContentLoaded', boot);
document.addEventListener('click', ()=>Snd.unlock(), {once:true});

})();
