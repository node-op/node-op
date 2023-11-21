# node-op base

## overview

## package manager

we are using yarn 4 for package management. yarn 4 provides some core features we want to leverage:

### `workspaces`

this is both a concept and a plugin that yarn provides. workspaces generally are a set of interrelated packages that have special ways they combine. in this monorepo environment, the interrelations are automatically calculated, and a release is always referring to the code on the same branch.

### corepack

this feature, that became available in node 16, allows you to define a package manager in your package.json. note that yarn will also let you put yarn in the codebase directly, but i prefer the corepack approach as it more broadly applies.

## chosen languages

by and large i plan to use TypeScript. if there's a need to bridge or go another way, we will, but i believe familiarity beats compiled speed for real production use cases before having clear profit reasons to improve it. se can build most c++/go/rust apps into js bundles and use them so it's really not a big ask.

## repo layout

the repo is laid out to be both permanently locked to itself (a monorepo), and is broken down into `apps`, `shared`, and `utils`. 

### apps

this is where application code itself goes. if it's in here it is deployed to some target and runs

### shared

this is where packages used by the apps stay. these things aren't to be released as single services, just helpers we use across apps.

### utils

this is infra/deployment/quality tooling live and is written. right now it features a simple node wrapper and use case.