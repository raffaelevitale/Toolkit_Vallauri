import argparse
import random

def main():
    parser = argparse.ArgumentParser(description="Generatore casuale per interrogazioni/lavori di gruppo")
    parser.add_argument("--studenti", type=int, required=True, help="Numero totale di studenti")
    parser.add_argument("--escludi", type=int, nargs="*", default=[], help="Numeri da escludere")
    parser.add_argument("--modalita", choices=["singolo", "gruppo"], default="singolo", help="Tipo di estrazione")
    parser.add_argument("--dimensione", type=int, default=1, help="Dimensione del gruppo (se modalita=gruppo)")
    parser.add_argument("--turni", type=int, default=1, help="Quanti turni di estrazione")
    parser.add_argument("--reinserisci", action="store_true", help="Reinserisci i numeri dopo l'estrazione")

    args = parser.parse_args()

    pool = [i for i in range(1, args.studenti + 1) if i not in args.escludi]
    random.shuffle(pool)

    for turno in range(1, args.turni + 1):
        if args.modalita == "singolo":
            if not pool:
                print("⚠️ Nessun numero disponibile!")
                break
            scelto = random.choice(pool)
            print(f"Turno {turno}: {scelto}")
            if not args.reinserisci:
                pool.remove(scelto)
        else:
            if len(pool) < args.dimensione:
                print("⚠️ Non ci sono abbastanza studenti per formare un gruppo")
                break
            scelti = random.sample(pool, args.dimensione)
            print(f"Turno {turno}: {scelti}")
            if not args.reinserisci:
                for s in scelti:
                    pool.remove(s)

if __name__ == "__main__":
    main()
