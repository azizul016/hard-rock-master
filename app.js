document.getElementById("searchBtn").addEventListener('click', function(){
    const searchInput = document.getElementById('inputValue');
    fetch(`https://api.lyrics.ovh/suggest/${searchInput.value}`)
        .then(res => res.json())
        .then(data => {
            const songInfo = document.getElementById('songInfo');
            const info = data.data;
            const newInfo = info.slice(0,10)
            var template ="";
            for (let i = 0; i < newInfo.length; i++) {
                const songTitle = newInfo[i].title;
                const artistName = newInfo[i].artist.name;
                const li = `<div class="single-result row align-items-center my-3 p-3">
                <div class="col-md-9">
                    <h3 class="lyrics-name">${songTitle}</h3>
                    <p class="author lead">Album by <span>${artistName}</span></p>
                </div>
                <div class="col-md-3 text-md-right text-center">
                    <button onclick="lyrics('${artistName}','${songTitle}')" class="btn btn-success">Get Lyrics</button>
                </div>
            </div>`
                template += li;             
            }
            songInfo.innerHTML = template;
        })
      
})
//For getting Lyrics;
function lyrics(songTitle, artistName) {
    fetch(`https://api.lyrics.ovh/v1/${songTitle}/${artistName}`)
    .then(res => res.json())
    .then(data => {
       document.getElementById("lyrics").innerHTML = data.lyrics;
       document.getElementById('lyricsTitle').innerText = songTitle;
       document.getElementById('artistName').innerText = artistName;
       document.getElementById("lyrics").style.display = "block";
       document.getElementById("hideTitleAuthor").style.display = "block";
       document.getElementById("btnTop").style.display = "inline-block";
    })
}
