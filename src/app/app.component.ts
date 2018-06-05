import { Component } from '@angular/core';

import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  lat: number;
  lng: number;

  init = false;

  taxistas: Taxista[] = [];
  siguiendoA: string = null;
  siguiendoNombre: string = null;
  
  styles = [
    {
        "featureType": "landscape.natural.landcover",
        "stylers": [
            {
                "gamma": 0.44
            },
            {
                "hue": "#2bff00"
            }
        ]
    },
    {
        "featureType": "water",
        "stylers": [
            {
                "hue": "#00a1ff"
            },
            {
                "saturation": 29
            },
            {
                "gamma": 0.74
            }
        ]
    },
    {
        "featureType": "landscape.natural.terrain",
        "stylers": [
            {
                "hue": "#00ff00"
            },
            {
                "saturation": 54
            },
            {
                "lightness": -51
            },
            {
                "gamma": 0.4
            }
        ]
    },
    {
        "featureType": "transit.line",
        "stylers": [
            {
                "gamma": 0.27
            },
            {
                "hue": "#0077ff"
            },
            {
                "saturation": -91
            },
            {
                "lightness": 36
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "stylers": [
            {
                "saturation": 10
            },
            {
                "lightness": -23
            },
            {
                "hue": "#0099ff"
            },
            {
                "gamma": 0.71
            }
        ]
    },
    {
        "featureType": "poi.business",
        "stylers": [
            {
                "hue": "#0055ff"
            },
            {
                "saturation": 9
            },
            {
                "lightness": -46
            },
            {
                "gamma": 1.05
            }
        ]
    },
    {
        "featureType": "administrative.country",
        "stylers": [
            {
                "gamma": 0.99
            }
        ]
    },
    {
        "featureType": "administrative.province",
        "stylers": [
            {
                "lightness": 36
            },
            {
                "saturation": -54
            },
            {
                "gamma": 0.76
            }
        ]
    },
    {
        "featureType": "administrative.locality",
        "stylers": [
            {
                "lightness": 33
            },
            {
                "saturation": -61
            },
            {
                "gamma": 1.21
            }
        ]
    },
    {
        "featureType": "administrative.neighborhood",
        "stylers": [
            {
                "hue": "#ff0000"
            },
            {
                "gamma": 2.44
            }
        ]
    },
    {
        "featureType": "road.highway.controlled_access",
        "stylers": [
            {
                "hue": "#ff0000"
            },
            {
                "lightness": 67
            },
            {
                "saturation": -40
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "stylers": [
            {
                "hue": "#ff6600"
            },
            {
                "saturation": 52
            },
            {
                "gamma": 0.64
            }
        ]
    },
    {
        "featureType": "road.local",
        "stylers": [
            {
                "hue": "#006eff"
            },
            {
                "gamma": 0.46
            },
            {
                "saturation": -3
            },
            {
                "lightness": -10
            }
        ]
    },
    {
        "featureType": "transit.line",
        "stylers": [
            {
                "hue": "#0077ff"
            },
            {
                "saturation": -46
            },
            {
                "gamma": 0.58
            }
        ]
    },
    {
        "featureType": "transit.station",
        "stylers": [
            {
                "gamma": 0.8
            }
        ]
    },
    {
        "featureType": "transit.station.rail",
        "stylers": [
            {
                "hue": "#ff0000"
            },
            {
                "saturation": -45
            },
            {
                "gamma": 0.9
            }
        ]
    },
    {
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "gamma": 0.58
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "gamma": 2.01
            },
            {
                "hue": "#00ffff"
            },
            {
                "lightness": 22
            }
        ]
    },
    {
        "featureType": "transit",
        "stylers": [
            {
                "saturation": -87
            },
            {
                "lightness": 44
            },
            {
                "gamma": 1.98
            },
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.business",
        "elementType": "labels.text",
        "stylers": [
            {
                "gamma": 0.06
            },
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "hue": "#00aaff"
            },
            {
                "lightness": -6
            },
            {
                "gamma": 2.21
            }
        ]
    },
    {
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "gamma": 3.84
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "gamma": 9.99
            }
        ]
    },
    {
        "featureType": "administrative",
        "stylers": [
            {
                "gamma": 0.01
            }
        ]
    }
];

  constructor(db: AngularFirestore) {
    db.collection('user').valueChanges()
        .subscribe( ( data: Taxista[] ) => {

          this.taxistas = data;

          if ( !this.init ) {
            this.lat = data[0].lat;
            this.lng = data[0].lng;
            this.init = true;
          }

          if ( this.siguiendoA ) {

            data.forEach( taxista => {

              if ( taxista.clave === this.siguiendoA ) {
                this.lat = taxista.lat;
                this.lng = taxista.lng;
                console.log(this.lat);
                console.log(this.lng);
              }

            });

          }


        });
  }


  seguir( taxista: Taxista ) {
    
    this.siguiendoA = taxista.clave;
    this.siguiendoNombre = taxista.nombre;

    this.lat = taxista.lat;
    this.lng = taxista.lng;

  }

  dejarDeSeguir() {
    this.siguiendoA = null;
    this.siguiendoNombre = null;
  }

}



interface Taxista {
  nombre: string;
  clave: string;
  lat: number;
  lng: number;
}
