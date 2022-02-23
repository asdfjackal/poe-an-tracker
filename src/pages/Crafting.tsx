import { Avatar, Chip, Grid, List, Typography } from "@mui/material";
import { useState } from "react";
import AvailableCraft from "../components/AvailableCraft";
import FavoriteCraft from "../components/FavoriteCraft";
import { data } from "../data";
import { Modifier } from "../react-app-env";

export default function Crafting(props: {
  inventory: Map<string, number>;
  craft: Function;
  favorites: string[];
  toggleFavorite: Function;
}) {
  const { inventory, craft, favorites, toggleFavorite } = props;
  const [hoveredTarget, setHoveredTarget] = useState<string | null>(null);

  const craftableMods = Array.from(data.entries())
    .filter(([key, value]) => value.tier > 1)
    .sort((a, b) => a[1].name.localeCompare(b[1].name));
  const availableCrafts = craftableMods
    .map(([key, value]): [string, Modifier, number] => {
      const count = Math.min(
        ...value.ingredients.map(
          (ingredient) => (inventory.get(ingredient) as number) | 0
        )
      );
      return [key, value, count];
    })
    .filter(([key, value, count]) => count >= 1);

  function getBaseIngredients(key: string) {
    const item: Modifier = data.get(key);
    if (item.ingredients.length === 0) return key;
    return item.ingredients.reduce(
      (list: string[], ingredient: string) =>
        list.concat(getBaseIngredients(ingredient)),
      [key]
    );
  }

  const favoriteIngredients = favorites.reduce(
    (list: string[], favorite: string) => [
      ...list,
      ...getBaseIngredients(favorite),
    ],
    []
  );
  const targetKeys = Array.from(new Set(favoriteIngredients));

  const targetItems = Array.from(data.entries())
    .filter(([key, value]) => targetKeys.includes(key))
    .map(([key, value]: [string, Modifier]): [string, Modifier, boolean] => [
      key,
      value,
      value.ingredients.includes(hoveredTarget) ||
        value.used_in.includes(hoveredTarget),
    ]);

  const tieredTargets = targetItems.reduce(function (tiers: any, target) {
    if (!tiers[target[1].tier]) {
      tiers[target[1].tier] = [];
    }
    tiers[target[1].tier].push(target);
    return tiers;
  }, []);

  return (
    <Grid container columns={3} spacing={1}>
      <Grid item xs={1}>
        <Typography align="center">Available Crafts</Typography>
        <List dense={true}>
          {availableCrafts.map(([key, value, count]) => (
            <AvailableCraft
              key={key}
              dataKey={key}
              value={value}
              count={count}
              craft={() => craft(key)}
            />
          ))}
        </List>
      </Grid>
      <Grid item xs={1}>
        <Typography align="center">Target Items</Typography>
        {tieredTargets.map(
          (targets: [string, Modifier, boolean][], tier: number) => (
            <>
              <Typography align="center">Tier {tier}</Typography>
              {targets
                .sort((a, b) => a[1].name.localeCompare(b[1].name))
                .map(([key, value, colored]) => (
                  <>
                    <Chip
                      onMouseEnter={() => {
                        setHoveredTarget(key);
                      }}
                      onMouseLeave={() => {
                        setHoveredTarget(null);
                      }}
                      avatar={
                        <Avatar
                          src={
                            process.env.PUBLIC_URL +
                            `/images/archnemesis/${key}.png`
                          }
                        />
                      }
                      color={colored ? "primary" : undefined}
                      label={value.name}
                      variant={colored ? undefined : "outlined"}
                    />
                    &nbsp;
                  </>
                ))}
            </>
          )
        )}
      </Grid>
      <Grid item xs={1}>
        <Typography align="center">Favorite Crafts</Typography>
        <List dense={true}>
          {Array.from(data.entries())
            .filter(([key, value]) => value.tier > 1)
            .sort((a, b) => a[1].name.localeCompare(b[1].name))
            .map(([key, value]) => (
              <FavoriteCraft
                key={key}
                dataKey={key}
                value={value}
                isFavorite={favorites.includes(key)}
                toggle={() => toggleFavorite(key)}
              />
            ))}
        </List>
      </Grid>
    </Grid>
  );
}
