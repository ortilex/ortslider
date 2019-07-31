//<![CDATA[
      var initDemo = function () {
        var header = document.getElementById("header");
        var skin = location.href.split('skin=')[1];

        if (!skin) {
          skin = 'Snapgram';
        }

        if (skin.indexOf('#') !== -1) {
          skin = skin.split('#')[0];
        }

        var skins = {
          'Snapgram': {
            'avatars': true,
            'list': false,
            'autoFullScreen': false,
            'cubeEffect': true
          },

          'VemDeZAP': {
            'avatars': false,
            'list': true,
            'autoFullScreen': false,
            'cubeEffect': false
          },

          'FaceSnap': {
            'avatars': true,
            'list': false,
            'autoFullScreen': true,
            'cubeEffect': false
          },

          'Snapssenger': {
            'avatars': false,
            'list': false,
            'autoFullScreen': false,
            'cubeEffect': false
          }
        };

        var timeIndex = 0;
        var shifts = [35, 60, 60 * 3, 60 * 60 * 2, 60 * 60 * 25, 60 * 60 * 24 * 4, 60 * 60 * 24 * 10];
        var timestamp = function () {
          var now = new Date();
          var shift = shifts[timeIndex++] || 0;
          var date = new Date(now - shift * 1000);

          return date.getTime() / 1000;
        };

        var stories = new Zuck('stories', {
          backNative: true,
          previousTap: true,
          autoFullScreen: skins[skin]['autoFullScreen'],
          skin: skin,
          avatars: skins[skin]['avatars'],
          list: skins[skin]['list'],
          cubeEffect: skins[skin]['cubeEffect'],
          localStorage: true,
          stories: [
            {
              id: "seb issam",
              photo: "https://scontent.frba3-1.fna.fbcdn.net/v/t1.0-1/p160x160/67977193_2390745951215149_2749430517194555392_n.jpg?_nc_cat=101&_nc_oc=AQn6F4z2BUKFQHAf1N-5lmVf9XNeE7iWXRvKsWPYZa3uFrbgDE5SAshJW4CcYoxbsxg&_nc_ht=scontent.frba3-1.fna&oh=58f7e5c498f8cda4f6d3452456872529&oe=5DE6BDDD",
              name: "seb issam",
              link: "",
              lastUpdated: timestamp(),
              items: [
                Zuck.buildItem("sebissam-1", "photo", 5, "https://1.bp.blogspot.com/-NglqDNa9Hvs/XUG6XlswpjI/AAAAAAAADfQ/u2pMKHVre78N_smL0_8sUuABPqWOhYG8ACLcBGAs/s1600/officialaccount.jpg", "https://1.bp.blogspot.com/-NglqDNa9Hvs/XUG6XlswpjI/AAAAAAAADfQ/u2pMKHVre78N_smL0_8sUuABPqWOhYG8ACLcBGAs/s1600/officialaccount.jpg", '', false, false, timestamp()),
                Zuck.buildItem("sebissam-2", "photo", 3, "https://1.bp.blogspot.com/-gb6YT6I3lGc/XUG6SKGTPsI/AAAAAAAADfM/sT54vlAoCi8c8dahPC4yHiUf3lZ7X4KEQCLcBGAs/s1600/moviev2.jpg", "https://1.bp.blogspot.com/-gb6YT6I3lGc/XUG6SKGTPsI/AAAAAAAADfM/sT54vlAoCi8c8dahPC4yHiUf3lZ7X4KEQCLcBGAs/s1600/moviev2.jpg", 'https://facebook.com/issame.madrid.1', false, false, timestamp()),
              ]
            }
          ]
        });

        var el = document.querySelectorAll('#skin option');
        var total = el.length;
        for (var i = 0; i < total; i++) {
          var what = (skin == el[i].value) ? true : false;

          if (what) {
            el[i].setAttribute('selected', what);

            header.innerHTML = skin;
            header.className = skin;
          } else {
            el[i].removeAttribute('selected');
          }
        }

        document.body.style.display = 'block';
      };

      initDemo();
//]]>
