Apka do wysyłania utworów na siłowni za opłatą
nazwa: JukeBoxGym
OPis działania z perpektywy uzytkownika:
1. Rejestruje sie 
2. Loguje sie
3. Dodaje ewentualnie kartę żeby mi sciagalo za kazdy utwór
4. Wybieram utwór
5. Po wybraniu wyskakuje informacja o cenie utworu (zależna od długosci) oraz o tym który jestem w kolejce
(za ile poleci mój utwór)
6. Potwierdzam wybór i dokonuje platnosci (podpiętą kartą lub blikiem)
7. Widzę swój utwór w liscie wszystkich kawałkow po przeprocesowaniu płatności
8. Dodawanie utworów do ulubionych i inne pierdoły

Architektura - pytania:
1. Skad wziąc piosenki ? - YT ? na yt jest sporo smieciowych kawałkow (moze poleciec beka ksh)
						 - swoja baza piosenek (skad je wziac ?)
						 - spotify (niema smieciowych numerow i mozna puszcza chyba)	
Spotify (aspekty prawne: sprawdz warunki odtwarzania utworow w "spotify for business")
2. czy potrzebuje bazy z wszystkimi utworami ze spotify ? Tak - trzeba zaciagnac przez api spotify i zapisac utwory u siebie w bazie i po wybraniu jednego przez uzytkownika wyslac do danej silowni
3. Której siłowni? - odpowiedz - uzytkownik wybiera z UI siłownie albo łączy się z silownia automatycznie 
przy pomocy lokalizacji
4. Jaka bramka płatnicza wariacie ? PayU - polska bramka platnicza



CHAT GPT
Infrastruktura aplikacji, która umożliwia odtwarzanie muzyki w obrębie jednej siłowni, mogłaby wyglądać następująco:

Aplikacja mobilna: użytkownicy siłowni musieliby pobrać aplikację na swoje urządzenia mobilne, takie jak smartfony lub tablety, aby korzystać z usługi.

Serwer aplikacji: serwer musiałby zostać uruchomiony, aby obsłużyć żądania użytkowników. Serwer ten byłby odpowiedzialny za odtwarzanie muzyki i zarządzanie kolejką utworów. W zależności od liczby użytkowników, wymagana byłaby odpowiednia moc obliczeniowa i przepustowość łącza internetowego.

Baza danych: aplikacja musiałaby korzystać z bazy danych, aby przechowywać informacje o użytkownikach, utworach, kolejkach i innych istotnych parametrach. Baza ta mogłaby być zarządzana przez serwer aplikacji lub znajdować się na zewnętrznym serwerze.

Interfejs API: aplikacja musiałaby korzystać z interfejsu API Spotify, aby uzyskać informacje o utworach i umożliwić użytkownikom przeglądanie i wybieranie utworów do odtworzenia. Korzystanie z API Spotify wymagałoby odpowiedniej autoryzacji i autentykacji, aby zapewnić bezpieczeństwo danych użytkowników i zgodność z warunkami korzystania z usługi Spotify.

Urządzenia audio: aplikacja musiałaby mieć możliwość połączenia się z urządzeniami audio na siłowni, takimi jak głośniki lub systemy audio. W zależności od konfiguracji siłowni, aplikacja musiałaby być zdolna do obsługi różnych rodzajów urządzeń audio i protokołów transmisji audio.

Płatności: aplikacja musiałaby oferować mechanizm płatności, aby użytkownicy siłowni mogli płacić za korzystanie z usługi. Mechanizm ten mógłby obejmować subskrypcje lub opłaty jednorazowe.