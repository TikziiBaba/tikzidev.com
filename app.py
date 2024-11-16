from flask import Flask, render_template, request, redirect, url_for

# Flask uygulamasını başlat
app = Flask(__name__)

# Kullanıcı veritabanı dosya adı
USER_DATABASE = "user.txt"

@app.route('/')
def ana_menu():
    return render_template('index.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        kullanici_adi = request.form['username']
        sifre = request.form['password']
        with open(USER_DATABASE, "a") as f:
            f.write(f"{kullanici_adi},{sifre}\n")
        return redirect(url_for('ana_menu'))
    return render_template('register.html')

if __name__ == '__main__':
    app.run(debug=True)
