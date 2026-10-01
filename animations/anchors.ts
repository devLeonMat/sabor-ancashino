/**
 * Algunas "secciones" viven dentro de una escena pinneada (p. ej. #picante
 * aparece al final del hero). Su posición de scroll real la conoce el
 * ScrollTrigger que la anima, así que la escena registra aquí un resolver.
 */
type Resolver = () => number;

const resolvers = new Map<string, Resolver>();

export function registerScrollAnchor(id: string, resolve: Resolver) {
  resolvers.set(id, resolve);
  return () => {
    if (resolvers.get(id) === resolve) resolvers.delete(id);
  };
}

export function resolveScrollAnchor(id: string): number | undefined {
  return resolvers.get(id)?.();
}
