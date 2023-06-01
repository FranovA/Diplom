import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  articles = [
    {'title': 'Клиентская база', 'image': 'assets/fon1.png', 'text': 'Яндекс Музыка - это Музыкальный сервис. Стриминговый сервис с десятками миллионов треков в библиотеке, музыкальными подборками, персональными рекомендациями и подкастами. Яндекс.Музыку можно включать в приложениях для iOS и Android и также на сайте music.yandex.ru.'},
    {'title': 'Работники', 'image': 'assets/fon1.png', 'text': 'ФИО: Франов Андрей. Номер телефона: +7(999)888-77-66'},
    {'title': 'Бригады', 'image': 'assets/fon1.png', 'text': 'Стриминговый сервис компании «Яндекс», позволяющий прослушивать музыкальные композиции, альбомы, подборки музыкальных треков и получать персональные рекомендации.'},
    {'title': 'Объекты', 'image': 'assets/fon1.png', 'text': 'Самые крупные аналоги на российском рынке, такие сервисы как: Spotify, VK Музыка, YouTube Music. Отличий на всех платформах минимальны, данные сервисы созданы исключительно под удобство использования платформы в целом.'},
    {'title': 'Новости', 'image': 'assets/fon1.png', 'text': 'Поскольку Яндекс.Музыка является многоплатформенным программным продуктом, требования к приложению сравнительно малы, приложение поддерживается на смартфонах с ОС Android/IOS поколений 2015 года и выше. Для пользованием приложения достаточно 85 Мб свободного пространства на накопителе и стабильное интернет соединение.'},
    {'title': 'Общие положения', 'image': 'assets/fon11.png', 'text': 'Главное для чего создано приложение Яндекс.Музыка – прослушивание музыки. В приложении есть функционал позволяющий выбирать конкретные жанры, исполнителя, прослушать новинки современной музыки, а так же послушать подкасты и книги. Главной фишкой является функция – «Моя Волна», при использовании алгоритмы просчитывают твои любимые жанры и исполнителей и предоставляют плейлист со схожей музыкой. Данная функция все еще не совершенна и разработчики стараются улучшить её с каждым обновлением.'},
    {'title': 'Клиенту', 'image': 'assets/fon1.png', 'text': 'Главное достоинство данного продукта – интуитивно понятный функционал и возможность всегда подобрать музыку на свой вкус.'},
    {'title': 'Работнику', 'image': 'assets/fon1.png', 'text': 'Главным из них будет то, что среди огромного числа песен, в данном приложении присутствуют не все, а лишь официально выпущенные и не скрытые исполнителем работы.'},
    {'title': 'О компании', 'image': 'assets/fon1.png', 'text': 'В данном продукте все еще дорабатывается функция «Моя Волна», для более качественного и избирательно подбора не только по жанрам и исполнителю, но и по мелодии и эмоциональной составляющей музыки. Так же расширяется база треков доступных для прослушивания, привнося как самые новые и модные хиты, так и не стареющую классику.'},
    {'title': 'Применение приложения', 'text': 'Предметная область  Яндекс.Музыки – это конечно же развлечение и повседневная жизнь. На данный момент, в мире каждый человек слушает музыку.'},

  ]

  id: number = 0;
  article: any = {'title': '', 'text': ''};

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get("id")!;
    this.article = this.articles[this.id];
  }

}