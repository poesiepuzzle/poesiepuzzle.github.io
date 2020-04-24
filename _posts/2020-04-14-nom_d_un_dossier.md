---
title: nom d'un dossier
published: false
---

<style>
body {
  color: white;
  background-color: black;
  transition: 3s;
}
</style>

``` sh
echo $0 | sed 's#/\([^/]*\)$##'
```

C'est beau n'est-ce-pas ? Cette ligne de code retourne le dossier dans lequel se
trouve l'exécutable que vous êtes en train d'utiliser. Comment ? `$0` est
l'argument 0 de l'appel qui lui a été fait, c'est-à-dire lui-même (`$1` sera son
premier argument). Avec `|`, on envoie le résultat de la commande `echo` à la
commande `sed`. Et `sed` utilise le bloc de caractère qu'il reçoit en argument 
(son `$1` à lui, en somme) pour traiter le résultat qu'il reçoit par le `|` (on
dit un tube). Et là ça devient marrant : ce bloc est une expression rationnelle,
_regexp_ pour les plus intimes. Le premier caractère est `s` pour _search_. Donc
`sed` va prendre l'expression qui est entre les deux premiers `#`, et la
remplacer par l'expression qui est entre le 2ème `#` et le 3ème (en l'occurence,
rien). Le bloc qui décrit le motif de recherche est donc : 

```
/\([^/]*\)$
```

Ce qui veut dire "une chaine de caractères qui commence par un `/`, suivi d'un
groupe de caractères dont chacun est tout sauf un `/`, finissant le mot." Et
comment finit un mot ? Soit par un espace, soit par un retour à la ligne.

Dans le détail :

--- | ---
`*` | "un caractère"
`[^a]*` | "un caractère qui n'est pas `a`"
`\([^a]*\)` | "un groupe de ces caractères"
`a\([^a]*\)` | "un `a` suivi de ce groupe"

Remplacez `a` par `/`, vous avez "un `/` suivi d'un groupe de
caractères dont aucun n'est un `/`". Le `$` à la fin signifie "finissant le
mot".

