from yt_dlp import YoutubeDL #pip install yt-dlp

URLS = ['https://www.youtube.com/watch?v=4kVTqUxJYBA']
with YoutubeDL() as ydl:
    ydl.download(URLS)