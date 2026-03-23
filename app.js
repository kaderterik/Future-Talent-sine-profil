const TMDB_API_KEY = "862e415836119f07e16b8034ed6273b3";
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const MAX_SELECTED_MOVIES = 4;

const GENRE_MAP_TR = {
  12: "Macera",
  14: "Fantezi",
  16: "Animasyon",
  18: "Drama",
  27: "Korku",
  28: "Aksiyon",
  35: "Komedi",
  53: "Gerilim",
  80: "Suç",
  878: "Bilim Kurgu",
  9648: "Gizem",
  10759: "Macera",
  10765: "Bilim Kurgu",
  10749: "Romantik"
};

const RADAR_AXES = ["Aksiyon", "Drama", "Komedi", "Korku", "Bilim Kurgu", "Macera"];
const OVERVIEW_THEME_HINTS = [
  { keywords: ["aşk", "romance", "sevgi", "ilişki", "kalp"], label: "aşk işleri" },
  { keywords: ["intikam", "revenge", "hesaplaşma"], label: "intikam motivasyonu" },
  { keywords: ["suç", "crime", "mafya", "gang"], label: "suç dünyası temposu" },
  { keywords: ["uzay", "space", "galaksi", "planet"], label: "uzay kafası" },
  { keywords: ["zaman", "time", "gelecek", "future"], label: "zaman-bükme fantezisi" },
  { keywords: ["gizem", "mystery", "sır", "ipucu"], label: "gizem çözme modu" },
  { keywords: ["savaş", "war", "ordu", "battle"], label: "savaş stratejisi" },
  { keywords: ["komedi", "comedy", "gül", "eğlence"], label: "kahkaha dozu" },
  { keywords: ["korku", "horror", "hayalet", "katil"], label: "adrenalinli korku hattı" },
  { keywords: ["kahraman", "hero", "superhero", "güç"], label: "kahramanlık enerjisi" }
];
const PERSONAL_CLOSING_TEMPLATES = [
  "{name}, film gecesi planı yapılınca kumandayı sana bırakmak artık bilimsel bir gereklilik gibi duruyor.",
  "{name}, senin izleme zevkin tam ayarında bir kokteyl: biraz duygu, biraz kaos, üstüne zekâ köpüğü.",
  "{name}, bu profille senin watchlist'e giren film ya efsane olur ya da en azından efsane tartışma çıkarır.",
  "{name}, senin sinema radarın Netflix algoritmasına özgeçmiş bıraktırır, o derece net.",
  "{name}, bu kombinasyonla senin film önerileri arkadaş grubunda mini kriz ve bol kahkaha yaratır.",
  "{name}, sende tam bir “bir sahnede ağlarım, diğer sahnede teoriyi çözerim” enerjisi var.",
  "{name}, senin film zevki kaotik iyi: düzenli düzensizlik, kontrollü manyaklık.",
  "{name}, bu profil, “film bitti ama etkisi bitmedi” kulübüne VIP üyelik gibi.",
  "{name}, senin sinema damarın storyboard çizdirir; boş sahne bırakmıyorsun.",
  "{name}, özet geçmek gerekirse: sen film seçmiyorsun, film gecesine karakter yazıyorsun."
];
const PERSONALITY_VARIANTS = {
  "Derin Gözlemci": createVariantPool(
    ["Duygusal zekâsı güçlü", "İnce detayları yakalayan", "Empatisi yüksek", "Derinlik arayan", "Sessiz ama etkileyici", "Kalbiyle düşünen", "Hikâye odaklı", "İlişkilerde hassas", "Sezgisel karar veren", "Karakter çözümleyici"],
    ["The Joker", "Enola Holmes", "Mr. Darcy", "Luna Lovegood", "Jack Dawson"],
    ["Duygusal tonları hızla yakalayan birisin", "Karakterlerin iç çatışmalarını okumakta çok iyisin", "Romantik ve dramatik geçişleri doğal biçimde hissediyorsun", "Sahne altındaki duyguyu çözebilen güçlü bir sezgin var", "İlişki dinamiklerinde derinliği fark eden bir bakış açın var", "Duygusal kırılma anlarında anlatının özünü hemen yakalıyorsun", "Karakterlerin sessiz anlarında bile çok şey okuyabiliyorsun", "Hikâyedeki samimiyet ve kırılganlık seni güçlü biçimde etkiliyor", "Dramatik yapıların duygu akışını sabırla takip ediyorsun", "Romantik anlatılarda yüzeyin değil, anlamın peşinden gidiyorsun"],
    ["Bu yaklaşımın, seni film seçimlerinde daha seçici ve daha tutarlı yapıyor; izlediğin her yapım kişisel bir içgörüye dönüşüyor.", "Bu duyarlılık sayesinde karakter motivasyonlarını hızlıca çözüyorsun ve hikâyeyi yalnızca izlemek yerine gerçekten deneyimliyorsun.", "Bu güçlü empati, filmlerdeki ilişkileri gerçek hayattaki bağlarla birlikte değerlendirmeni sağlıyor; yorumların bu yüzden çok isabetli.", "Bu bakış açın, dramatik sahnelerdeki alt metni yakalamanı kolaylaştırıyor; film bittikten sonra bile etkisi sende uzun süre kalıyor.", "Bu derin algı, anlatının ritmine uyum sağlamanı ve karakterlerin dönüşümünü daha net görmeni mümkün kılıyor."]
  ),
  "Adrenalin Avcısı": createVariantPool(
    ["Hız odaklı", "Cesur hamleler yapan", "Risk yönetimi güçlü", "Refleksi yüksek", "Kararlı ilerleyen", "Aksiyon zekâsı keskin", "Meydan okumayı seven", "Tempo bağımlısı", "Sürükleyici plan kuran", "Anlık karar ustası"],
    ["Sherlock Holmes", "Ethan Hunt", "Indiana Jones", "John Wick", "Lara Croft"],
    ["Yüksek tempolu hikâyelerde enerjini en verimli şekilde kullanıyorsun", "Tehlike ve belirsizlik anlarında sakin kalmayı başarıyorsun", "Macera odaklı anlatılarda karar hızın dikkat çekici", "Aksiyon sahnelerinde strateji ve refleksi birlikte yorumluyorsun", "Zor koşullarda bile çözüm üretme becerin yüksek", "Hızlı ritimde bile detayları kaçırmayan bir odak yapın var", "Mücadele içeren öyküler seni motive ediyor", "Riskli karar anlarında öncelikleri netleştirip ilerliyorsun", "Kaotik sahneleri bile planlı bir çerçevede değerlendirebiliyorsun", "Dinamizmi yüksek filmlerde hikâyeyi bütünlüklü takip ediyorsun"],
    ["Bu özelliklerin, özellikle aksiyon ve macera türünde seçimlerini güçlü kılıyor; tempolu filmlerde en parlak yorumunu ortaya koyuyorsun.", "Bu yaklaşımın sayesinde hikâyedeki kriz anlarını doğru okuyup karakterin stratejik yönünü daha iyi analiz ediyorsun.", "Bu enerji düzeyi, seni hem izleme sırasında hem de değerlendirme aşamasında aktif tutuyor; film deneyimin hep canlı kalıyor.", "Bu refleksif bakış, karmaşık aksiyon örgüsünde bile neden-sonuç zincirini korumana yardımcı oluyor.", "Bu dinamizm, film tercihlerinde kararlılık ve yüksek heyecan arasında dengeli bir çizgi kurduğunu gösteriyor."]
  ),
  "Ebedi İyimser": createVariantPool(
    ["Neşesi bulaşıcı", "Pozitif enerjisi yüksek", "Renkli bakış açısına sahip", "Gülümseten ruhlu", "Moral yükselten", "Sıcakkanlı yorumcu", "Eğlence odaklı", "Umut taşıyan", "İyi his anlatısı seven", "Işıltılı düşünce yapısına sahip"],
    ["Olaf", "Spider-Man", "Paddington", "Po", "Ted Lasso"],
    ["Hayata pozitif taraftan bakma eğilimin film seçimlerinde net şekilde hissediliyor", "Komedi ve animasyonlarda duygusal rahatlama alanı buluyorsun", "Eğlenceli anlatıları yalnızca izlemiyor, içselleştiriyorsun", "İyimser karakterlerle hızlı bağ kuran bir profilin var", "Mizahı yalnızca kahkaha değil, dayanıklılık aracı olarak da görüyorsun", "Sıcak anlatılar sendeki denge hissini güçlendiriyor", "Neşeli ritimlerde dikkatini uzun süre koruyabiliyorsun", "Gülümseten hikâyelerden motivasyon devşiriyorsun", "İyi his bırakan final sahneleri sende daha kalıcı etki bırakıyor", "Enerjisi yüksek filmler seni zihinsel olarak tazeliyor"],
    ["Bu eğilim, seçimlerinde moral ve umut dengesini koruduğunu gösteriyor; film deneyimini daha sürdürülebilir kılıyor.", "Bu bakış açın sayesinde mizahın altındaki duygusal zekâyı da fark ediyor, karakterlerle samimi bir bağ kuruyorsun.", "Bu yaklaşım, seni hem günlük hayatta hem de film yorumlarında daha yapıcı bir çizgiye taşıyor.", "Bu pozitif çerçeve, yoğun hikâyeler arasında nefes alanı yaratmanı sağlıyor; seçimlerin bu yüzden dengeli.", "Bu güçlü iyimserlik, filmden aldığın keyfi artırırken çevrene de iyi bir enerji yansıtmanı destekliyor."]
  ),
  "Gizem Çözücü": createVariantPool(
    ["Soğukkanlı analiz yapan", "Şüpheyi iyi yöneten", "İpucu avcısı", "Karanlık atmosferi okuyan", "Mantık zinciri güçlü", "Gerilim yönetimi yüksek", "Parçaları birleştiren", "Sürprizleri sezen", "Ayrıntı takipçisi", "Çözüm odaklı dedektif ruhlu"],
    ["Batman", "Hercule Poirot", "Clarice Starling", "Sherlock Holmes", "Lisbeth Salander"],
    ["Belirsizlik içeren hikâyelerde odağını kaybetmeden ilerliyorsun", "Korku ve gerilim türünde detay yakalama becerin çok güçlü", "Gizemli olay örgülerinde neden-sonuç bağını hızla kuruyorsun", "Sahte ipuçlarını ayıklama konusunda dikkat çekici bir netliğin var", "Karanlık atmosferde bile analitik düşünme çizgini koruyorsun", "Beklenmedik kırılmaları önceden sezen bir sezgiye sahipsin", "Katmanlı anlatılarda her sahneyi veri gibi okuyabiliyorsun", "Gerilim yükselse de değerlendirme kaliten düşmüyor", "Soru işaretlerini sabırla taşıyıp doğru anda çözüme ulaşıyorsun", "Düğüm noktalarını fark etmede üstün bir gözleme sahipsin"],
    ["Bu analitik yaklaşımın, film seçimlerinde seni güvenilir bir çözümleyiciye dönüştürüyor; karmaşık hikâyelerde parlıyorsun.", "Bu güçlü dikkat, özellikle gerilim yapılarında anlatının zayıf ve güçlü yönlerini net görmeni sağlıyor.", "Bu bakış açın sayesinde olay örgüsünü yalnızca takip etmiyor, aktif biçimde yeniden kuruyorsun.", "Bu sezgisel mantık dengesi, gizemli filmlerde çok daha derin bir izleme deneyimi yaşamanı mümkün kılıyor.", "Bu çözüm odaklı yapı, filmleri değerlendirirken duyguyla mantığı dengeli biçimde birleştirmeni destekliyor."]
  ),
  "Gelecek Vizyoneri": createVariantPool(
    ["Ufku geniş", "Olasılıkları düşünen", "Sistem bakışı güçlü", "Hayal gücü keskin", "Yenilik arayan", "Spekülatif düşünen", "Teknoloji meraklısı", "Kurgu evreni takipçisi", "Büyük resim odaklı", "Dönüşümü öngören"],
    ["Neo", "Paul Atreides", "Doctor Strange", "Ellen Ripley", "Trinity"],
    ["Bilim kurgu ve fantezi evrenlerinde hızla yön buluyorsun", "Alternatif gerçeklikleri anlamlandırma becerin yüksek", "Gelecek tasvirlerini günlük hayatla ilişkilendirebiliyorsun", "Kurgu sistemlerini çözümleyip mantıksal çerçeve kuruyorsun", "Büyük ölçekli anlatılarda bile duygusal hattı kaçırmıyorsun", "Fantastik dünyalarda kuralları hızla öğrenip bağ kuruyorsun", "Teknoloji ve insan ilişkisini birlikte değerlendirebiliyorsun", "Sınırları zorlayan fikirleri açık zihinle karşılıyorsun", "Dönüşüm hikâyelerinde karakterin vizyon gelişimini iyi okuyorsun", "Yüksek konseptli filmleri sade bir anlam örgüsüne çevirebiliyorsun"],
    ["Bu vizyoner yaklaşım, seni yenilikçi anlatılarda çok güçlü bir yorumcu yapıyor; geniş evrenleri anlamlı bir bütün halinde okuyorsun.", "Bu düşünce biçimi sayesinde karmaşık kurgu yapıları sende kafa karışıklığı yaratmıyor; aksine merakını artırıyor.", "Bu bakış açın, film seçimlerinde hayal gücü ve mantık dengesini koruduğunu açık biçimde gösteriyor.", "Bu yetenek, gelecek odaklı temaları kişisel gelişim perspektifiyle birleştirmeni sağlıyor.", "Bu geniş perspektif, bilim kurgu ve fantezi tercihlerinde derinlikli ve özgün yorumlar üretmeni destekliyor."]
  )
};

const PERSONALITY_RULES = [
  {
    genres: ["Drama", "Romantik"],
    type: "Derin Gözlemci",
    character: "The Joker veya Enola Holmes",
    description:
      "Duyguların ve hikâyelerin derinine iniyorsun. Karakter odaklı anlatımlar seni en çok etkileyen dünya."
  },
  {
    genres: ["Aksiyon", "Macera"],
    type: "Adrenalin Avcısı",
    character: "Sherlock Holmes",
    description:
      "Hızlı kararlar, yüksek tempo ve riskli seçimler tam sana göre. Macera senin doğal modun."
  },
  {
    genres: ["Komedi", "Animasyon"],
    type: "Ebedi İyimser",
    character: "Olaf veya Spider-Man",
    description:
      "Hayata pozitif bakan, eğlenceyi kaçırmayan bir ruhun var. İyi enerji yaymayı seviyorsun."
  },
  {
    genres: ["Korku", "Gerilim"],
    type: "Gizem Çözücü",
    character: "Batman",
    description:
      "Karanlıkta ipucu aramayı seviyor, bilinmezlikleri soğukkanlı şekilde çözüyorsun."
  },
  {
    genres: ["Bilim Kurgu", "Fantezi"],
    type: "Gelecek Vizyoneri",
    character: "Neo",
    description:
      "Hayal gücün yüksek, olasılıkları ve geleceği düşünmeyi seviyorsun. Sınırlar seni durdurmuyor."
  }
];

const movieSearchInput = document.getElementById("movieSearchInput");
const searchResults = document.getElementById("searchResults");
const selectedMoviesContainer = document.getElementById("selectedMovies");
const selectedCounter = document.getElementById("selectedCounter");
const analyzeBtn = document.getElementById("analyzeBtn");
const resultPanel = document.getElementById("resultPanel");
const personalityTypeEl = document.getElementById("personalityType");
const personalityDescriptionEl = document.getElementById("personalityDescription");
const shareBtn = document.getElementById("shareBtn");
const resetBtn = document.getElementById("resetBtn");
const chartCanvas = document.getElementById("profileChart");
const userNameInput = document.getElementById("userNameInput");
const themeToggleBtn = document.getElementById("themeToggleBtn");

let selectedMovies = [];
let searchDebounceTimer = null;
let activeChart = null;
let lastResultText = "";
let lastQuery = "";
let lastGenreData = null;

movieSearchInput.addEventListener("input", handleSearchInput);
analyzeBtn.addEventListener("click", analyzeProfile);
shareBtn.addEventListener("click", copyResultToClipboard);
resetBtn.addEventListener("click", resetForNewPerson);
themeToggleBtn.addEventListener("click", toggleTheme);
selectedMoviesContainer.addEventListener("click", (event) => {
  const button = event.target.closest(".remove-btn");
  if (!button) return;
  const movieId = button.dataset.id;
  removeMovie(movieId);
});

document.addEventListener("click", (event) => {
  if (!searchResults.contains(event.target) && event.target !== movieSearchInput) {
    hideResults();
  }
});

async function handleSearchInput(event) {
  const query = event.target.value.trim();
  lastQuery = query;
  clearTimeout(searchDebounceTimer);

  if (query.length < 2) {
    clearResults();
    return;
  }

  searchDebounceTimer = setTimeout(async () => {
    const titles = await searchTitles(query);
    renderSearchResults(titles);
  }, 350);
}

async function searchTitles(query) {
  if (!query) return [];
  const encodedQuery = encodeURIComponent(query);
  const movieUrl = `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodedQuery}&language=tr-TR&page=1&include_adult=false`;
  const tvUrl = `${TMDB_BASE_URL}/search/tv?api_key=${TMDB_API_KEY}&query=${encodedQuery}&language=tr-TR&page=1&include_adult=false`;

  try {
    const [movieResponse, tvResponse] = await Promise.all([fetch(movieUrl), fetch(tvUrl)]);
    if (!movieResponse.ok || !tvResponse.ok) throw new Error("Film/dizi arama isteği başarısız.");

    const [movieData, tvData] = await Promise.all([movieResponse.json(), tvResponse.json()]);
    const normalizedMovies = (movieData.results || []).map((item) => normalizeMediaItem(item, "movie"));
    const normalizedSeries = (tvData.results || []).map((item) => normalizeMediaItem(item, "tv"));

    return [...normalizedMovies, ...normalizedSeries]
      .sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
      .slice(0, 10);
  } catch (error) {
    console.error(error);
    return [];
  }
}

function renderSearchResults(movies) {
  clearResults();

  if (!movies.length) return;

  const fragment = document.createDocumentFragment();

  movies.forEach((movie) => {
    const item = document.createElement("li");
    item.className = "result-item";
    item.setAttribute("role", "button");
    item.tabIndex = 0;

    const posterSrc = resolvePoster(movie, "80x120");

    const year = movie.release_date ? movie.release_date.slice(0, 4) : "Yıl yok";
    const mediaLabel = movie.media_type === "tv" ? "Dizi" : "Film";

    item.innerHTML = `
      <img src="${posterSrc}" alt="${escapeHtml(movie.title)} afişi" />
      <div>
        <div class="result-title">${escapeHtml(movie.title)}</div>
        <div class="result-year">${year} · ${mediaLabel}</div>
      </div>
    `;

    const onSelect = () => selectMovie(movie);
    item.addEventListener("pointerdown", (event) => {
      // Mobilde input odağının kaybolmasını engeller, klavyeyi açık tutar.
      event.preventDefault();
    });
    item.addEventListener("click", onSelect);
    item.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        onSelect();
      }
    });

    fragment.appendChild(item);
  });

  searchResults.appendChild(fragment);
  searchResults.classList.add("show");
}

function selectMovie(movieData) {
  const alreadySelected = selectedMovies.some((movie) => movie.uniqueId === movieData.uniqueId);
  if (alreadySelected) {
    focusSearchInput();
    return;
  }

  if (selectedMovies.length >= MAX_SELECTED_MOVIES) return;

  selectedMovies.push(movieData);
  lastQuery = "";
  movieSearchInput.value = "";
  clearResults();
  renderSelectedMovies();
  toggleAnalyzeButton();
  focusSearchInput();
}

function removeMovie(movieId) {
  selectedMovies = selectedMovies.filter((movie) => movie.uniqueId !== movieId);
  renderSelectedMovies();
  toggleAnalyzeButton();
}

function renderSelectedMovies() {
  selectedMoviesContainer.innerHTML = "";
  selectedCounter.textContent = `${selectedMovies.length} / ${MAX_SELECTED_MOVIES} seçildi`;

  selectedMovies.forEach((movie) => {
    const card = document.createElement("article");
    card.className = "movie-card";

    const posterSrc = resolvePoster(movie, "300x450");

    const year = movie.release_date ? movie.release_date.slice(0, 4) : "Yıl yok";
    const mediaLabel = movie.media_type === "tv" ? "Dizi" : "Film";

    card.innerHTML = `
      <img src="${posterSrc}" alt="${escapeHtml(movie.title)} afişi" />
      <div class="movie-meta">
        <h3>${escapeHtml(movie.title)}</h3>
        <p>${year} · ${mediaLabel}</p>
        <button class="remove-btn" data-id="${movie.uniqueId}">Sil</button>
      </div>
    `;

    selectedMoviesContainer.appendChild(card);
  });
}

function toggleAnalyzeButton() {
  analyzeBtn.disabled = selectedMovies.length !== MAX_SELECTED_MOVIES;
}

async function analyzeProfile() {
  if (selectedMovies.length !== MAX_SELECTED_MOVIES) return;

  const genreFrequency = {};
  selectedMovies.forEach((movie) => {
    (movie.genre_ids || []).forEach((genreId) => {
      const genreName = GENRE_MAP_TR[genreId];
      if (!genreName) return;
      genreFrequency[genreName] = (genreFrequency[genreName] || 0) + 1;
    });
  });
  lastGenreData = { ...genreFrequency };

  const characterCandidates = await fetchCharacterCandidates(selectedMovies);
  const personality = assignPersonality(
    genreFrequency,
    selectedMovies,
    userNameInput.value.trim(),
    characterCandidates
  );
  const rawName = userNameInput.value.trim();
  const userName = rawName || "Sinemasever";
  personalityTypeEl.textContent = `${personality.type}`;
  personalityDescriptionEl.textContent = `${userName}, ${personality.description} Eşleşen karakter: ${personality.character}.`;
  lastResultText = `${userName}: ${personality.type} - ${personality.description} Eşleşen karakter: ${personality.character}.`;

  resultPanel.classList.remove("hidden");
  resultPanel.scrollIntoView({ behavior: "smooth", block: "start" });
  renderChart(genreFrequency);
}

function assignPersonality(genreFrequency, movies, userName, characterCandidates = []) {
  const scored = PERSONALITY_RULES.map((rule) => {
    const [g1, g2] = rule.genres;
    const s1 = genreFrequency[g1] || 0;
    const s2 = genreFrequency[g2] || 0;
    const comboBonus = s1 > 0 && s2 > 0 ? 1 : 0;
    return { rule, score: s1 + s2 + comboBonus };
  });

  const maxScore = Math.max(...scored.map((item) => item.score), 0);
  const finalists = scored.filter((item) => item.score === maxScore).map((item) => item.rule);
  const winner = finalists.length ? pickRandom(finalists) : null;

  if (!winner) {
    return {
      type: "Sinema Kâşifi",
      character: "Amélie",
      description: buildMovieAwareDescription(
        "Çeşitli türlere açık, meraklı ve sürprizleri seven bir film profiline sahipsin.",
        movies,
        genreFrequency,
        userName
      )
    };
  }

  const variants = PERSONALITY_VARIANTS[winner.type];
  const baseLongText = variants ? pickRandom(variants.descriptions) : winner.description;
  const character = characterCandidates.length
    ? pickRandom(characterCandidates)
    : variants
      ? pickRandom(variants.characters)
      : winner.character;

  return {
    ...winner,
    character,
    description: buildMovieAwareDescription(baseLongText, movies, genreFrequency, userName)
  };
}

function pickRandom(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function createVariantPool(characterPrefixes, characterBase, openers, continuations) {
  return {
    characters: characterPrefixes.flatMap((prefix) => characterBase.map((name) => `${prefix} ${name}`)),
    descriptions: openers.flatMap((opener) => continuations.map((cont) => `${opener}. ${cont}`))
  };
}

function buildMovieAwareDescription(baseText, movies, genreFrequency, userName) {
  const topGenres = Object.entries(genreFrequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2)
    .map(([genre]) => genre);
  const overviewPart = buildOverviewBasedComment(movies, userName);
  const moviePart = "Seçtiğin film ve dizilerin konuları bu eğilimi net biçimde destekliyor.";
  const genrePart = topGenres.length
    ? `Özellikle ${topGenres.join(" ve ")} yoğunluğu profilinin temel çizgisini belirliyor.`
    : "";

  return `${baseText} ${moviePart} ${genrePart} ${overviewPart}`.trim();
}

function buildOverviewBasedComment(movies, userName) {
  const overviewBlob = movies
    .map((movie) => movie.overview || "")
    .join(" ")
    .toLocaleLowerCase("tr-TR");

  const matchedThemes = OVERVIEW_THEME_HINTS.filter((hint) =>
    hint.keywords.some((keyword) => overviewBlob.includes(keyword))
  )
    .map((hint) => hint.label)
    .slice(0, 3);

  if (!matchedThemes.length) {
    return `${safeDisplayName(userName)}, konu tarafında tam bir sürpriz kutususun; senin izleme menüsüne algoritma bile şapka çıkarır.`;
  }

  const themeText = matchedThemes.join(", ");
  const personalizedClosing = pickRandom(PERSONAL_CLOSING_TEMPLATES).replaceAll(
    "{name}",
    safeDisplayName(userName)
  );

  return `Konu özetlerinden gördüğüm kadarıyla sende ${themeText} baskın; yani sen sinemada “biraz kaos, biraz kalp, üstüne zekâ sosu” seven tayfadansın. ${personalizedClosing}`;
}

function safeDisplayName(name) {
  return name && name.trim() ? name.trim() : "Sinemasever";
}

function renderChart(genreData) {
  const values = RADAR_AXES.map((axis) => genreData[axis] || 0);
  const ctx = chartCanvas.getContext("2d");
  const themeVars = getComputedStyle(document.body);
  const accent = themeVars.getPropertyValue("--accent").trim() || "#ff4fa3";
  const secondary = themeVars.getPropertyValue("--secondary").trim() || "#ff7ac6";
  const textColor = themeVars.getPropertyValue("--text").trim() || "#ffffff";
  const darkTheme = !document.body.classList.contains("light-theme");

  if (activeChart) activeChart.destroy();

  const gradient = ctx.createLinearGradient(0, 0, 320, 320);
  gradient.addColorStop(0, `${hexToRgba(accent, 0.65)}`);
  gradient.addColorStop(1, `${hexToRgba(secondary, 0.55)}`);

  activeChart = new Chart(ctx, {
    type: "radar",
    data: {
      labels: RADAR_AXES,
      datasets: [
        {
          label: "Film/Dizi Kişilik Haritası",
          data: values,
          fill: true,
          backgroundColor: gradient,
          borderColor: accent,
          pointBackgroundColor: secondary,
          pointBorderColor: textColor,
          borderWidth: 2
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        r: {
          suggestedMin: 0,
          suggestedMax: MAX_SELECTED_MOVIES,
          ticks: {
            color: darkTheme ? "rgba(255,255,255,0.75)" : "rgba(20,20,20,0.75)",
            stepSize: 1,
            backdropColor: "transparent"
          },
          grid: { color: darkTheme ? "rgba(255,255,255,0.16)" : "rgba(20,20,20,0.16)" },
          angleLines: { color: darkTheme ? "rgba(255,255,255,0.1)" : "rgba(20,20,20,0.1)" },
          pointLabels: {
            color: textColor,
            font: { family: "Inter, sans-serif", size: 12, weight: "600" }
          }
        }
      },
      plugins: {
        legend: {
          labels: {
            color: textColor,
            font: { family: "Inter, sans-serif", weight: "600" }
          }
        }
      }
    }
  });
}

async function copyResultToClipboard() {
  if (!lastResultText) return;

  try {
    await navigator.clipboard.writeText(lastResultText);
    shareBtn.textContent = "Kopyalandı!";
    setTimeout(() => {
      shareBtn.textContent = "Sonuçları Paylaş";
    }, 1400);
  } catch (error) {
    console.error("Kopyalama başarısız:", error);
    shareBtn.textContent = "Kopyalanamadı";
    setTimeout(() => {
      shareBtn.textContent = "Sonuçları Paylaş";
    }, 1400);
  }
}

function toggleTheme() {
  const isLight = !document.documentElement.classList.contains("light-theme");
  document.documentElement.classList.toggle("light-theme", isLight);
  document.body.classList.toggle("light-theme", isLight);
  themeToggleBtn.textContent = isLight ? "Tema: White" : "Tema: Dark";
  if (lastGenreData && !resultPanel.classList.contains("hidden")) {
    renderChart(lastGenreData);
  }
}

function clearResults() {
  searchResults.innerHTML = "";
  searchResults.classList.remove("show");
}

function hideResults() {
  searchResults.classList.remove("show");
}

function focusSearchInput() {
  requestAnimationFrame(() => {
    movieSearchInput.focus({ preventScroll: true });
    const length = movieSearchInput.value.length;
    movieSearchInput.setSelectionRange(length, length);
  });
}

function resetForNewPerson() {
  selectedMovies = [];
  searchDebounceTimer = null;
  lastResultText = "";
  lastQuery = "";
  lastGenreData = null;

  movieSearchInput.value = "";
  userNameInput.value = "";
  shareBtn.textContent = "Sonuçları Paylaş";
  personalityTypeEl.textContent = "Kişilik Tipi";
  personalityDescriptionEl.textContent = "";

  clearResults();
  renderSelectedMovies();
  toggleAnalyzeButton();
  resultPanel.classList.add("hidden");

  if (activeChart) {
    activeChart.destroy();
    activeChart = null;
  }

  userNameInput.focus({ preventScroll: true });
}

function hexToRgba(hex, alpha) {
  const sanitized = hex.replace("#", "").trim();
  const normalized =
    sanitized.length === 3
      ? sanitized
          .split("")
          .map((char) => char + char)
          .join("")
      : sanitized;
  const intVal = Number.parseInt(normalized, 16);
  if (Number.isNaN(intVal)) return `rgba(255, 79, 163, ${alpha})`;
  const r = (intVal >> 16) & 255;
  const g = (intVal >> 8) & 255;
  const b = intVal & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function normalizeMediaItem(item, mediaType) {
  return {
    id: item.id,
    uniqueId: `${mediaType}-${item.id}`,
    media_type: mediaType,
    title: mediaType === "tv" ? item.name : item.title,
    release_date: mediaType === "tv" ? item.first_air_date : item.release_date,
    genre_ids: item.genre_ids || [],
    overview: item.overview || "",
    poster_path: item.poster_path || item.backdrop_path || null,
    popularity: item.popularity || 0
  };
}

function resolvePoster(mediaItem, size) {
  if (mediaItem.poster_path) return `${TMDB_IMAGE_BASE_URL}${mediaItem.poster_path}`;
  return `https://via.placeholder.com/${size}?text=No+Poster`;
}

async function fetchCharacterCandidates(mediaItems) {
  const creditsList = await Promise.all(mediaItems.map((item) => fetchMediaCredits(item)));
  const candidates = [];
  const seen = new Set();

  creditsList.forEach((entry) => {
    if (!entry?.cast?.length) return;
    entry.cast.slice(0, 6).forEach((cast) => {
      const characterName = (cast.character || cast.name || "").trim();
      if (!characterName) return;
      const pretty = `${characterName} (${entry.title})`;
      const key = pretty.toLocaleLowerCase("tr-TR");
      if (seen.has(key)) return;
      seen.add(key);
      candidates.push(pretty);
    });
  });

  return candidates.slice(0, 20);
}

async function fetchMediaCredits(mediaItem) {
  const endpoint =
    mediaItem.media_type === "tv"
      ? `${TMDB_BASE_URL}/tv/${mediaItem.id}/credits`
      : `${TMDB_BASE_URL}/movie/${mediaItem.id}/credits`;
  const url = `${endpoint}?api_key=${TMDB_API_KEY}&language=tr-TR`;

  try {
    const response = await fetch(url);
    if (!response.ok) return { title: mediaItem.title, cast: [] };
    const data = await response.json();
    return {
      title: mediaItem.title,
      cast: data.cast || []
    };
  } catch (error) {
    console.error("Kredi verisi alınamadı:", error);
    return { title: mediaItem.title, cast: [] };
  }
}

function escapeHtml(text) {
  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
