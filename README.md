# Presentation 

**ColorLib**  créé par [Dev-univers](https://fr-fr.facebook.fr/dev.univers/) est un manipulateur de couleurs css à la Sass avec javascript dans le but de faciliter la manipulation des couleurs à partie du code javascript

Les noms de méthode ont un peu été emprunté à Sass ainsi que leurs objectifs ; **ColorLib** decoule en fait d'une envie d'utiliser les fonctions de modifications de couleur de Sass en plus dynamique ( en javascript )

## Les méthodes

Elles sont : 

### adjust(color , properties={red:null,green:null,blue:null,hue:null,saturation:null,lightness:null})

*ColorLib.adjust()* permet d'ajouter ou de diminuer (ajuster) une ou plusieurs propriétés d'une couleur 
* red , green , et blue representent respectivement les propiétés RGB *Red* , *Green* , et *Blue* ; et doivent être comprises entre -255 et 255
* hue , saturation , et lightness eux representent à leur tour les propriétés HSL *Hue* , *Saturation* , et *Lightness* ; et sont comprises entre -359 et 359 (360) pour le h , et -100 et 100 pour les deux derniers
> Il n'est pas autorisé de modifier les propriétés RGB et HSL simultanement 

**Exemple**
```js
    const color = ColorLib.adjust('#55f',{red:150})
    console.log(color)
    // #eb55ff
```
### change(color , properties={red:null,green:null,blue:null,hue:null,saturation:null,lightness:null})

*ColorLib.change()* permet de changer complètement une ou plusieurs propriétés d'une couleur 
* red , green , et blue representent respectivement les propiétés RGB *Red* , *Green* , et *Blue* ; et doivent être comprises entre 0 et 255
* hue , saturation , et lightness eux representent à leur tour les propriétés HSL *Hue* , *Saturation* , et *Lightness* ; et sont comprises entre 0 et 359 (360) pour le h , et 0 et 100 pour les deux derniers
> Il n'est pas autorisé de modifier les propriétés RGB et HSL simultanement 

**Exemple**
```js
    const color = ColorLib.change('#55f',{green:230})
    console.log(color)
    // #55e6ff
```
### darken(color,amount)

*ColorLib.darken()* permet d'assombrir une couleur d'un pourcentage donné *amount*

**Exemple**
```js
    const color = ColorLib.darken('#55f',30)
    console.log(color)
    // #0000bb
```
### desaturate(color,amount)

*ColorLib.desaturate()* permet de diminuer la saturation d'une couleur d'un pourcentage donné *amount*

**Exemple**
```js
    const color = ColorLib.desaturate('#55f',45)
    console.log(color)
    // #7b7bd9
```
### get(color,property)

*ColorLib.get()* permet de recupérer une propriété pressise dans une couleur

**Exemple**
```js
    const hue = ColorLib.get('#55f','hue')
    console.log(hue)
    // 240
```
### grayScale(color)

*ColorLib.grayScale()* retourne une couleur grise avec la même legerté que *color*

**Exemple**
```js
    const color = ColorLib.grayScale('#55f','hue')
    console.log(color)
    // #ababab
```

### lighten(color,amount)

*ColorLib.lighten()* permet d'eclaisir une couleur d'un pourcentage donné *amount*

**Exemple**
```js
    const color = ColorLib.lighten('#0000bb',30)
    console.log(color)
    // #5555ff  
```
### saturate(color,amount)

*ColorLib.saturate()* permet d'augmenter la saturation d'une couleur d'un pourcentage donné *amount*

**Exemple**
```js
    const color = ColorLib.saturate('#7b7bd9',45)
    console.log(color)
    // #5555ff
```
### scale(color , properties={red:null,green:null,blue:null,hue:null,saturation:null,lightness:null})

*ColorLib.scale()* permet de rendre une ou plusieurs propriétés d'une couleur plus ou moins proche de sa valeur maximale (*255 pour red,green,et blue , 259 pour hue et 100 pour saturation et lightness*)
* si le pourcentage est positif , la propriété se raproche de sa valeur max
* si le pourcentage est negatif , elle se raproche de 0

**Exemple**
```js
    const color = ColorLib.scale('#55f',{'blue':-20})
    console.log(color)
    // #5555cc
```
