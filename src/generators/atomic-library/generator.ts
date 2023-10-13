import {
  addProjectConfiguration,
  formatFiles,
  generateFiles,
  getWorkspaceLayout,
  names,
  offsetFromRoot,
  Tree,
} from '@nrwl/devkit';
import * as path from 'path';
import type { AtomicProjectGeneratorSchema } from './schema';

interface NormalizedSchema extends AtomicProjectGeneratorSchema {
  projectName: string;
  projectRoot: string;
  organizationName?: string;
  parsedTags: string[];
}

function normalizeOptions(tree: Tree, options: AtomicProjectGeneratorSchema): NormalizedSchema {
  let name = names(options.name).fileName
  let organizationName;
  if (name.includes("@") && name.split('/').length > 1) {
    organizationName = options.name.split('/')[0];
  }
  let projectName = !!organizationName ? options.name.split('/')[1] : name;
  projectName = projectName.replace(new RegExp('/', 'g'), '-');
  const projectRoot = !!organizationName ? `${getWorkspaceLayout(tree).libsDir}/${organizationName}/${projectName}` : `${getWorkspaceLayout(tree).libsDir}/${projectName}`;
  const parsedTags = options.tags
    ? options.tags.split(',').map((s) => s.trim())
    : [];

  return {
    ...options,
    projectName,
    projectRoot,
    organizationName,
    parsedTags,
  };
}

function addFiles(tree: Tree, options: NormalizedSchema) {
    const templateOptions = {
      ...options,
      ...names(options.name),
      offsetFromRoot: offsetFromRoot(options.projectRoot),
      template: '',

      packageName: !!options.organizationName ? `${options.organizationName}/${options.name}` : options.name,
      moduleName: options.name
    };

    // Generate our base project files
    generateFiles(tree, path.join(__dirname, '../base-files'), options.projectRoot, templateOptions);

    // Generate our project specific files
    //generateFiles(tree, path.join(__dirname, 'files'), options.projectRoot, templateOptions);
}

export default async function (tree: Tree, options: AtomicProjectGeneratorSchema) {
  const normalizedOptions = normalizeOptions(tree, options);
  addProjectConfiguration(
    tree,
    normalizedOptions.name,
    {
      root: normalizedOptions.projectRoot,
      projectType: 'library',
      sourceRoot: `${normalizedOptions.projectRoot}/src`,
      targets: {
      },
      tags: normalizedOptions.parsedTags,
    }
  );
  addFiles(tree, normalizedOptions);
  await formatFiles(tree);
}
