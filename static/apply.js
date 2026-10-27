var UI = {
 en:{howto:"How to apply", docs:"Documents needed", online:"Apply online at", bank:"Apply at your bank branch", post:"Apply at a post office or bank"},
 ta:{howto:"விண்ணப்பிப்பது எப்படி", docs:"தேவையான ஆவணங்கள்", online:"இங்கே ஆன்லைனில் விண்ணப்பிக்கவும்:", bank:"உங்கள் வங்கிக் கிளையில் விண்ணப்பிக்கவும்", post:"அஞ்சல் அலுவலகம் அல்லது வங்கியில் விண்ணப்பிக்கவும்"},
 hi:{howto:"आवेदन कैसे करें", docs:"ज़रूरी दस्तावेज़", online:"यहाँ ऑनलाइन आवेदन करें:", bank:"अपनी बैंक शाखा में आवेदन करें", post:"डाकघर या बैंक में आवेदन करें"},
 ur:{howto:"درخواست کیسے دیں", docs:"درکار دستاویزات", online:"یہاں آن لائن درخواست دیں:", bank:"اپنی بینک برانچ میں درخواست دیں", post:"ڈاک خانے یا بینک میں درخواست دیں"}
};
var DOCL = {
 en:{aadhaar:"Aadhaar card", bank:"Bank account details", land:"Land records", birth:"Birth certificate", id:"Parent's ID proof", mobile:"Mobile number", biz:"Business details", marks:"Marksheet", income:"Income certificate", photo:"Passport-size photo"},
 ta:{aadhaar:"ஆதார் அட்டை", bank:"வங்கிக் கணக்கு விவரங்கள்", land:"நில ஆவணங்கள்", birth:"பிறப்புச் சான்றிதழ்", id:"பெற்றோரின் அடையாளச் சான்று", mobile:"மொபைல் எண்", biz:"வணிக விவரங்கள்", marks:"மதிப்பெண் பட்டியல்", income:"வருமானச் சான்றிதழ்", photo:"பாஸ்போர்ட் அளவு புகைப்படம்"},
 hi:{aadhaar:"आधार कार्ड", bank:"बैंक खाते का विवरण", land:"भूमि के दस्तावेज़", birth:"जन्म प्रमाण पत्र", id:"माता-पिता का पहचान पत्र", mobile:"मोबाइल नंबर", biz:"व्यवसाय का विवरण", marks:"अंक तालिका", income:"आय प्रमाण पत्र", photo:"पासपोर्ट साइज़ फोटो"},
 ur:{aadhaar:"آدھار کارڈ", bank:"بینک اکاؤنٹ کی تفصیلات", land:"زمین کے کاغذات", birth:"پیدائش کا سرٹیفکیٹ", id:"والدین کا شناختی ثبوت", mobile:"موبائل نمبر", biz:"کاروبار کی تفصیلات", marks:"مارک شیٹ", income:"آمدنی کا سرٹیفکیٹ", photo:"پاسپورٹ سائز تصویر"}
};
var APPLY = {
 "pm-kisan":{how:"online", site:"pmkisan.gov.in", docs:["aadhaar","bank","land"]},
 "sukanya":{how:"post", docs:["birth","id"]},
 "apy":{how:"bank", docs:["aadhaar","bank","mobile"]},
 "mudra":{how:"bank", docs:["aadhaar","biz","photo"]},
 "scholarship":{how:"online", site:"scholarships.gov.in", docs:["aadhaar","bank","marks","income"]},
 "jandhan":{how:"bank", docs:["aadhaar","photo"]}
};
function render(list) {
  var box = document.getElementById("results");
  if (list.length === 0) {
    box.innerHTML = "<div class='card'>" + t("none") + "</div>";
    return;
  }
  var html = "<h2>" + t("found").replace("{n}", list.length) + "</h2>";
  list.forEach(function (s) {
    var tx = (SCHEME_TEXT[s.id] || {})[currentLang] || [s.name, s.summary];
    var ap = APPLY[s.id];
    html += "<div class='card'><h3>" + tx[0] + "</h3><p>" + tx[1] + "</p>";
    if (ap) {
      var u = UI[currentLang], d = DOCL[currentLang];
      html += "<p><b>" + u.howto + "</b></p>";
      if (ap.how === "online") {
        html += "<p>" + u.online + " <a href='https://" + ap.site + "' target='_blank'>" + ap.site + "</a></p>";
      } else {
        html += "<p>" + u[ap.how] + "</p>";
      }
      html += "<p><b>" + u.docs + "</b></p><ul>";
      ap.docs.forEach(function (k) { html += "<li>" + d[k] + "</li>"; });
      html += "</ul>";
    }
    html += "</div>";
  });
  box.innerHTML = html;
}
